const StadiumRepo = require('../db/repositories/StadiumRepo');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class StadiumService {

    static async getStadiumById(id) {
        return StadiumRepo.toStadium(await StadiumRepo.getById(id));
    }

    static async getAllStadiums() {
        const allStadiums = await StadiumRepo.getAllStadiums();

        return allStadiums.map(StadiumRepo.toStadium);
    }

    static async getStadiums(filter = {}, page = 0) {
        let filterQuery = {};
        if (filter.country) filterQuery.country = filter.country;
        if (filter.state) filterQuery.state = filter.state;
        if (filter.city) filterQuery.city = filter.city;
        // if (filter.membership) filterQuery.membership = filter.membership;
        if (filter.search) {
            filterQuery[Op.or] = {
                name: {[Op.iLike]: '%'+filter.search+'%'},
            };
        }
        const order = (filter.sort === "za") ? [['name', 'DESC']] : [['name', 'ASC']];
        const stadiums = await StadiumRepo.getStadiums(filterQuery, page, order);

        return stadiums.map(StadiumRepo.toStadium);
    }

    static async upsertStadium(payload) {
        const newStadium = await StadiumRepo.upsertStadium(payload);

        return StadiumRepo.toStadium(newStadium);
    }
}

module.exports = StadiumService;
