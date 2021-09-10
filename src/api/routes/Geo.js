const express = require('../express');
const routeHandler = require('../routeHandler');
const GeoService = require('../../services/GeoService');

express.get('/getCountry/:id', routeHandler(async (request, response) => {
    const {id} = request.params;
    const country = await GeoService.getCountry(id);

    response.status(200);
    response.json({country});
}));

express.get('/getState/:id', routeHandler(async (request, response) => {
    const {id} = request.params;
    const state = await GeoService.getState(id);

    response.status(200);
    response.json({state});
}));

express.get('/getCity/:id', routeHandler(async (request, response) => {
    const {id} = request.params;
    const city = await GeoService.getCity(id);

    response.status(200);
    response.json({city});
}));

express.get('/getCountries', routeHandler(async (request, response) => {
    const countries = await GeoService.getCountries();

    response.status(200);
    response.json({countries});
}));

express.get('/getStates/:country_id', routeHandler(async (request, response) => {
    const {country_id} = request.params;
    const states = await GeoService.getStates(country_id);

    response.status(200);
    response.json({states});
}));

express.get('/getCities/:state_id', routeHandler(async (request, response) => {
    const {state_id} = request.params;
    const cities = await GeoService.getCities(state_id);

    response.status(200);
    response.json({cities});
}));
