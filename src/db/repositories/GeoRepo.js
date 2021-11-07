const {geo_countries} = require('../models');
const {geo_states} = require('../models');
const {geo_cities} = require('../models');

class GeoRepo {

    toCountry(country) {
        return {
            id: country.id,
            name: country.name,
            // code: country.code,
            // currency: country.currency,
            // timezones: country.timezones,
            // location: country.timezones,
        }
    }

    toState(state) {
        return {
            id: state.id,
            name: state.name,
            // country_id: state.country_id,
            // location: state.timezones,
        }
    }

    toCity(city) {
        return {
            id: city.id,
            name: city.name,
            // state_id: city.state_id,
            // country_id: city.country_id,
            // location: city.timezones,
        }
    }

    async getCountryById(id) {
        return await geo_countries.findOne({where: {id}});
    }

    async getAllCountries() {
        return await geo_countries.findAll({order: [['name', 'ASC']]});
    }

    async getCountriesWithStadium() {
        return await geo_countries.findAll({include: {model: stadiums, required: true}, order: [['name', 'ASC']]});
    }

    async getStateById(id) {
        return await geo_countries.findOne({where: {id}});
    }

    async getStatesByCountry(country_id) {
        return await geo_states.findAll({where: {country_id}, order: [['name', 'ASC']]});
    }

    async getCityById(id) {
        return await geo_cities.findOne({where: {id}});
    }

    async getCitiesByState(state_id) {
        return await geo_cities.findAll({where: {state_id}, order: [['name', 'ASC']]});
    }

}

module.exports = new GeoRepo();
