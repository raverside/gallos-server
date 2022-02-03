const {stadiums, geo_countries, geo_states, geo_cities} = require('../models');

class StadiumRepo {

    toStadium(stadium) {
        return {
            id: stadium.id,
            name: stadium.name,
            representative_name: stadium.representative_name,
            phone: stadium.phone,
            country: stadium.countries?.name,
            country_id: stadium.country,
            state: stadium.states?.name,
            state_id: stadium.state,
            city: stadium.cities?.name,
            city_id: stadium.city,
            image: stadium.image,
            logo: stadium.logo,
            bio: stadium.bio,
            five_sec: stadium.five_sec,
            membership: stadium.membership || null
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
        return await stadiums.findAll({include: this.includeQuery()});
    }

    async countStadiums() {
        return await stadiums.count();
    }

    async getStadiums(filterQuery, page, order) {
        // const limit = 10;
        // const offset = limit * page;

        // return await stadiums.findAll({where: {...{role:"user???"}, ...filterQuery}, order, offset, limit});
        return await stadiums.findAll({where: filterQuery, order, include: this.includeQuery()});
    }

    async upsertStadium(stadium) {
        if (stadium.id) {
            await stadiums.update(stadium, {where: {id: stadium.id}});
            return stadium;
        } else {
            return await stadiums.create(stadium);
        }
    }

}

module.exports = new StadiumRepo();
