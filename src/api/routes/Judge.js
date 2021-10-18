const express = require('../express');
const routeHandler = require('../routeHandler');
const EventService = require('../../services/EventService');

express.get('/getOngoingEvents', routeHandler(async (request, response) => {
    const stadium_id = request.currentUser.get('stadium_id');
    const events = await EventService.getOngoingEventsByStadiumId(stadium_id);

    response.status(200);
    response.json({events});
}));

express.get('/cancelMatch/:match_id', routeHandler(async (request, response) => {
    //cancel match
    response.status(200);
    response.json({success: true});
}));
