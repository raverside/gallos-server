const express = require('../express');
const routeHandler = require('../routeHandler');
const EventService = require('../../services/EventService');
const MatchesRepo = require('../../db/repositories/MatchesRepo');

express.get('/getOngoingEvents', routeHandler(async (request, response) => {
    const stadium_id = request.currentUser.get('stadium_id');
    const events = await EventService.getOngoingEventsByStadiumId(stadium_id);

    response.status(200);
    response.json({events});
}));

express.get('/cancelMatch/:match_id', routeHandler(async (request, response) => {
    const {match_id} = request.params;
    MatchesRepo.updateMatch(match_id, {live: false, result: 3});

    response.status(200);
    response.json({success: true});
}));

express.post('/announceMatchResult/:match_id', routeHandler(async (request, response) => {
    const {match_id} = request.params;
    const {result} = request.body;
    MatchesRepo.updateMatch(match_id, {live: false, result});

    response.status(200);
    response.json({success: true});
}));
