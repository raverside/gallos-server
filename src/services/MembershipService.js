const MembershipRepo = require('../db/repositories/MembershipRepo');

class MembershipService {

    static async getMembershipById(id) {
        return MembershipRepo.toMembership(await MembershipRepo.getById(id));
    }

    static async getMemberships() {
        const memberships = await MembershipRepo.getMemberships();

        return memberships.map(MembershipRepo.toMembership);
    }
}

module.exports = MembershipService;
