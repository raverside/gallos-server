const {memberships} = require('../models');

class MembershipRepo {

    toMembership(membership) {
        return {
            id: membership.id,
            name: membership.name,
            type: membership.type,
            duration: membership.duration,
            price: membership.price,
        }
    }

    async getById(id) {
        return await memberships.findOne({where: {id}});
    }

    async getMemberships() {
        return await memberships.findAll();
    }

}

module.exports = new MembershipRepo();
