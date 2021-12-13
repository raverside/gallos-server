const TeamOwnerRepo = require('../db/repositories/TeamOwnerRepo');

class TeamOwnerService {

    static async getTeamOwnerById(id) {
        return TeamOwnerRepo.toTeamOwner(await TeamOwnerRepo.getById(id));
    }

    static async getTeamOwnerByDigitalId(id) {
        return TeamOwnerRepo.toTeamOwner(await TeamOwnerRepo.getByDigitalId(id));
    }

    static async getTeamOwners() {
        const memberships = await TeamOwnerRepo.getTeamOwners();

        return memberships.map((to) => TeamOwnerRepo.toTeamOwner(to));
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
        const teams = await TeamOwnerRepo.getAllTeams();
console.log(teams);
        return teams.map((t) => TeamOwnerRepo.toTeam(t, t.team_owner));
    }

    static async createTeam(id, team) {
        return await TeamOwnerRepo.createTeam(id, team);
    }

    static async createLiberty(owner_id, reason, opponent_id, active) {
        return TeamOwnerRepo.toTeamOwner(await TeamOwnerRepo.createLiberty(owner_id, reason, opponent_id, active));
    }

    static async updateLiberty(id, reason, opponent_id, active) {
        return await TeamOwnerRepo.updateLiberty(id, reason, opponent_id, active);
    }

    static async removeLiberty(id) {
        return await TeamOwnerRepo.removeLiberty(id);
    }
}

module.exports = TeamOwnerService;
