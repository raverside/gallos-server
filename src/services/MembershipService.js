const MembershipRepo = require('../db/repositories/MembershipRepo');

class MembershipService {

    static async getMembershipById(id) {
        return MembershipRepo.toMembership(await MembershipRepo.getById(id));
    }

    static async getMemberships() {
        const memberships = await MembershipRepo.getMemberships();

        return memberships.map(MembershipRepo.toMembership);
    }

    static async upsertMembership(membership) {
        const newMembership = await MembershipRepo.upsertMembership(membership);

        return MembershipRepo.toMembership(newMembership);
    }

    static async removeMembership(id) {
        return await MembershipRepo.removeMembership(id);
    }
}

module.exports = MembershipService;
