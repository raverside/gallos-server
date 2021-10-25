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

    async upsertMembership(membership) {
        if (membership.id) {
            await memberships.update(membership, {where: {id: membership.id}});
            return membership;
        } else {
            return await memberships.create(membership);
        }
    }

    async removeMembership(id) {
        return await memberships.destroy({where: {id}});
    }

}

module.exports = new MembershipRepo();
