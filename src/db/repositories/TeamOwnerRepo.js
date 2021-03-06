const {teams, team_owners, team_owners_notes, mutual_liberty, geo_countries, geo_states, geo_cities} = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class TeamOwnerRepo {

    constructor() {
        this.preventLoop = 0;
    }

    toTeam(team, team_owner = false) {
        if (!team) return false;
        return {
            id: team.id,
            name: team.name,
            wins: team.wins,
            loses: team.loses,
            draws: team.draws,
            team_owner_id: team.team_owner_id,
            digital_id: team_owner ? team_owner.digital_id : team.digital_id
        }
    }

    toTeamOwner(team_owner) {
        if (!team_owner) return false;

        return {
            id: team_owner.id,
            name: team_owner.name,
            citizen_id: team_owner.citizen_id,
            phone: team_owner.phone,
            country: team_owner.countries?.name,
            country_id: team_owner.country,
            state: team_owner.states?.name,
            state_id: team_owner.state,
            city: team_owner.cities?.name,
            city_id: team_owner.city,
            teams: team_owner.teams?.map((t) => this.toTeam(t, team_owner)) || [],
            notes: team_owner.team_owners_notes || [],
            liberty: [...team_owner.owner_liberty, ...team_owner.opponent_liberty] || [],
            digital_id: team_owner.digital_id
        }
    }

    includeQuery() {
        return [
            {
                model: teams
            },
            {
                model: team_owners_notes
            },
            {
                model: geo_countries,
                as: 'countries'
            },
            {
                model: geo_states,
                as: 'states'
            },
            {
                model: geo_cities,
                as: 'cities'
            },
            {
                model: mutual_liberty,
                as: 'owner_liberty',
                include: [
                    {model: team_owners, as: 'opponent_liberty'}
                ]
            },
            {
                model: mutual_liberty,
                as: 'opponent_liberty',
                include: [
                    {model: team_owners, as: 'owner_liberty'}
                ]
            }
        ];
    }

    async countTeamOwners() {
        return {
            team_owners: await team_owners.count(),
            teams: await teams.count(),
            this_week: await team_owners.count({where: {created_at: {[Op.gt]: Sequelize.literal('NOW() - INTERVAL \'7d\'')}}}),
            last_week: await team_owners.count({where: {created_at: {[Op.lt]: Sequelize.literal('NOW() - INTERVAL \'7d\''), [Op.gt]: Sequelize.literal('NOW() - INTERVAL \'14d\'')}}}),
        };
    }

    async getById(id) {
        return await team_owners.findOne({where: {id}, include: this.includeQuery()});
    }

    async getByDigitalId(id) {
        return await team_owners.findOne({where: {digital_id: id}, include: this.includeQuery()});
    }

    async getTeamOwners() {
        return await team_owners.findAll({include: this.includeQuery()});
    }

    async upsertTeamOwner(teamOwner) {
        if (teamOwner.id) {
            await team_owners.update(teamOwner, {where: {id: teamOwner.id}});
            return teamOwner;
        } else {
            const digital_id = Math.floor(Math.random() * (999999  - 100000 + 1)) + 100000;
            try {
                return await team_owners.create({...teamOwner, digital_id});
            } catch (err) {
                this.preventLoop++;
                if (err.errors[0].validatorKey === 'not_unique' && this.preventLoop <= 20) return await this.upsertTeamOwner(teamOwner);
            }
        }
    }

    async createNote(team_owner_id, title, note) {
        const newNote = await team_owners_notes.create({team_owner_id, title, note});
        return await this.getById(newNote.team_owner_id);
    }

    async updateNote(id, title, note) {
        return await team_owners_notes.update({title, note}, {where: {id}, returning:true});
    }

    async removeNote(id) {
        return await team_owners_notes.destroy({where: {id}});
    }

    async createLiberty(owner_id, reason, opponent_id, active) {
        const newLiberty = await mutual_liberty.create({owner_id, reason, opponent_id, active});
        return await this.getById(newLiberty.owner_id);
    }

    async updateLiberty(id, reason, opponent_id, active) {
        return await mutual_liberty.update({reason, opponent_id, active}, {where: {id}, returning:true});
    }

    async removeLiberty(id) {
        return await mutual_liberty.destroy({where: {id}});
    }

    async createTeam(team_owner_id, name) {
        const digital_id = Math.floor(Math.random() * (999999  - 100000 + 1)) + 100000;
        try {
            const response = await teams.create({team_owner_id, name, digital_id})
            if (response) this.preventLoop = 0;
            return response;
        } catch (err) {
            this.preventLoop++;
            if (err.errors[0].validatorKey === 'not_unique' && this.preventLoop <= 20) return await this.createTeam(team_owner_id, name);
        }
    }

    async updateTeam(team) {
        return await teams.update({name: team.name}, {where: {id: team.id}});
    }

    async removeTeam(id) {
        return await teams.destroy({where: {id}});
    }

    async removeTeamOwner(id) {
        return await team_owners.destroy({where: {id}});
    }

    async getAllTeams() {
        return await teams.findAll({include: [team_owners]});
    }

}

module.exports = new TeamOwnerRepo();
