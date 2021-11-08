const {teams, team_owners, team_owners_notes, mutual_liberty, geo_countries, geo_states, geo_cities} = require('../models');

class TeamOwnerRepo {

    constructor() {
        this.preventLoop = 0;
    }

    toTeamOwner(team_owner) {
        return {
            id: team_owner.id,
            name: team_owner.name,
            citizen_id: team_owner.citizen_id,
            phone: team_owner.phone,
            country: team_owner.countries?.name,
            state: team_owner.states?.name,
            city: team_owner.cities?.name,
            teams: team_owner.teams || [],
            notes: team_owner.team_owners_notes || [],
            liberty: team_owner.owner_liberty || [],
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
            }
        ];
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
            const digital_id = (Math.random() * (999999999 - 100000000 + 1) ) << 0;
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
        const digital_id = (Math.random() * (999999999 - 100000000 + 1) ) << 0;
        try {
            const response = await teams.create({team_owner_id, name, digital_id})
            if (response) this.preventLoop = 0;
            return response;
        } catch (err) {
            this.preventLoop++;
            if (err.errors[0].validatorKey === 'not_unique' && this.preventLoop <= 20) return await this.createTeam(team_owner_id, name);
        }
    }

}

module.exports = new TeamOwnerRepo();
