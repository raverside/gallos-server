const express = require('../express');
const routeHandler = require('../routeHandler');
const EventService = require('../../services/EventService');
const EventRepo = require('../../db/repositories/EventRepo');
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
    const {result, match_time} = request.body;
    const updatedMatch = await MatchesRepo.updateMatch(match_id, {live: false, result, match_time});
    const event_id = updatedMatch[1][0]?.dataValues.eventId;
    if (event_id) {
        const matches = await MatchesRepo.getLiveMatchesByEventId(event_id);
        if (!matches.find(m => !m.result)) { // complete event if all matches are concluded
            await EventRepo.updateEvent({id: event_id, phase: "complete"});
        }
        response.status(200);
        response.json({success: true});
    } else {
        response.status(403);
        response.json({error: "error_match_result"});
    }
}));
