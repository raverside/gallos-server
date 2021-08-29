const {stadiums} = require('../models');

class StadiumRepo {

    toStadium(stadium) {
        return {
            id: stadium.id,
            name: stadium.name,
            representative_name: stadium.representative_name,
            phone: stadium.phone,
            country: stadium.country,
            city: stadium.city,
            image: stadium.image,
            logo: stadium.logo,
            bio: stadium.bio,
        }
    }

    async getById(id) {
        return await stadiums.findOne({where: {id}});
    }

}

module.exports = new StadiumRepo();
