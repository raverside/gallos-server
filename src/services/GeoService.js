const GeoRepo = require('../db/repositories/GeoRepo');

class MembershipService {

    static async getCountry(id) {
        return GeoRepo.toCountry(await GeoRepo.getCountryById(id));
    }

    static async getCountries(withStadium) {
        const countries = (withStadium) ? await GeoRepo.getCountriesWithStadium() : await GeoRepo.getAllCountries();

        return countries.map(GeoRepo.toCountry);
    }

    static async getState(id) {
        return GeoRepo.toState(await GeoRepo.getStateById(id));
    }

    static async getStates(country_id) {
        const states = await GeoRepo.getStatesByCountry(country_id);

        return states.map(GeoRepo.toState);
    }

    static async getCity(id) {
        return GeoRepo.toCity(await GeoRepo.getCityById(id));
    }

    static async getCities(state_id) {
        const cities = await GeoRepo.getCitiesByState(state_id);

        return cities.map(GeoRepo.toCity);
    }
}

module.exports = MembershipService;
