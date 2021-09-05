const TeamOwnerRepo = require('../db/repositories/TeamOwnerRepo');
const {teams} = require('../db/models');

class TeamOwnerService {

    static async getTeamOwnerById(id) {
        return TeamOwnerRepo.toTeamOwner(await TeamOwnerRepo.getById(id));
    }

    static async getTeamOwners() {
        const memberships = await TeamOwnerRepo.getTeamOwners();

        return memberships.map(TeamOwnerRepo.toTeamOwner);
    }

    static async upsertTeamOwner(teamOwner) {
        return await TeamOwnerRepo.upsertTeamOwner(teamOwner);
    }

    static async createNote(id, noteTitle, note) {
        return TeamOwnerRepo.toTeamOwner(await TeamOwnerRepo.createNote(id, noteTitle, note));
    }

    static async updateNote(note_id, noteTitle, note) {
        return await TeamOwnerRepo.updateNote(note_id, noteTitle, note);
    }

    static async removeNote(id) {
        return await TeamOwnerRepo.removeNote(id);
    }

    static async getAllTeams() {
        return await teams.findAll();
    }

    static async createTeam(id, team) {
        return await TeamOwnerRepo.createTeam(id, team);
    }
}

module.exports = TeamOwnerService;
