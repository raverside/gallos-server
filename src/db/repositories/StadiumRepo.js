const {stadiums, geo_countries, geo_states, geo_cities} = require('../models');

class StadiumRepo {

    toStadium(stadium) {
        return {
            id: stadium.id,
            name: stadium.name,
            representative_name: stadium.representative_name,
            phone: stadium.phone,
            country: stadium.countries?.name,
            state: stadium.states?.name,
            city: stadium.cities?.name,
            image: stadium.image,
            logo: stadium.logo,
            bio: stadium.bio,
        }
    }

    includeQuery() {
        return [
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
            }
        ];
    }

    async getById(id) {
        return await stadiums.findOne({where: {id}, include: this.includeQuery()});
    }

    async getAllStadiums() {
        return await stadiums.findAll();
    }

    async getStadiums(filterQuery, page, order) {
        // const limit = 10;
        // const offset = limit * page;

        // return await stadiums.findAll({where: {...{role:"user???"}, ...filterQuery}, order, offset, limit});
        return await stadiums.findAll({where: filterQuery, order, include: this.includeQuery()});
    }

}

module.exports = new StadiumRepo();
