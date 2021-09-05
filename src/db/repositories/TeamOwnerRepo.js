const {teams} = require('../models');
const {team_owners} = require('../models');
const {team_owners_notes} = require('../models');

class TeamOwnerRepo {

    toTeamOwner(team_owner) {
        return {
            id: team_owner.id,
            name: team_owner.name,
            citizen_id: team_owner.citizen_id,
            phone: team_owner.phone,
            country: team_owner.country,
            state: team_owner.state,
            city: team_owner.city,
            teams: team_owner.teams || [],
            notes: team_owner.team_owners_notes || [],
        }
    }

    includeQuery() {
        return [{model: teams}, {model: team_owners_notes}];
    }

    async getById(id) {
        return await team_owners.findOne({where: {id}, include: this.includeQuery()});
    }

    async getTeamOwners() {
        return await team_owners.findAll({include: this.includeQuery()});
    }

    async upsertTeamOwner(teamOwner) {
        if (teamOwner.id) {
            await team_owners.update(teamOwner, {where: {id: teamOwner.id}});
            return teamOwner;
        } else {
            return await team_owners.create(teamOwner);
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

    async createTeam(team_owner_id, name) {
        return await teams.create({team_owner_id, name});
    }

}

module.exports = new TeamOwnerRepo();
