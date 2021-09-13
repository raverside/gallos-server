const express = require('../express');
const routeHandler = require('../routeHandler');
const StadiumService = require('../../services/StadiumService');

express.get('/getStadium/:id', routeHandler(async (request, response) => {
    const {id} = request.params;
    const stadium = await StadiumService.getStadiumById(id);

    response.status(200);
    response.json({stadium});
}));

express.get('/getStadiums', routeHandler(async (request, response) => {
    const filter = {
        search: request.query.search,
        country: request.query.country,
        state: request.query.state,
        city: request.query.city,
        membership: request.query.membership,
        sort: request.query.sort || "az",
    };
    const page = request.query.page || 0;
    const stadiums = await StadiumService.getStadiums(filter, page);

    response.status(200);
    response.json({stadiums});
}));

express.get('/getAllStadiums', routeHandler(async (request, response) => {
    const stadiums = await StadiumService.getAllStadiums();

    response.status(200);
    response.json({stadiums});
}));
