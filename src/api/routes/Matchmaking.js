const express = require('../express');
const routeHandler = require('../routeHandler');
const MatchmakingService = require('../../services/MatchmakingService');
const MatchesRepo = require('../../db/repositories/MatchesRepo');
const EventService = require('../../services/EventService');

express.post('/generateMatches/:event_id', routeHandler(async (request, response) => {
    const {event_id} = request.params;
    const {method, special_guests} = request.body;
    const matches = await MatchmakingService.generateMatches(event_id, method, special_guests);

    response.status(200);
    response.json({matches})
}));

express.post('/publishMatches', routeHandler(async (request, response) => {
    const payload = request.body;
    await MatchmakingService.publishMatches(payload);

    response.status(200);
    response.json({success: true});
}));

express.get('/publishMatch/:match_id', routeHandler(async (request, response) => {
    const {match_id} = request.params;
    await MatchmakingService.publishMatch(match_id);

    response.status(200);
    response.json({success: true});
}))

express.get('/switchSides/:match_id', routeHandler(async (request, response) => {
    const {match_id} = request.params;
    const match = await MatchmakingService.getById(match_id);
    const oldParticipantId = ""+match.participant_id;
    const oldOpponentId = ""+match.opponent_id;
    match.participant_id = oldOpponentId;
    match.opponent_id = oldParticipantId;
    const result = await match.save();

    if (!result) {
        response.status(500);
    }
    const event = await EventService.getEventById(match.event_id);

    response.status(200);
    response.json({event});
}))

express.post('/createMatch', routeHandler(async (request, response) => {
    const {event_id, participant_id, opponent_id, live} = request.body;
    const eventMatchesCount = await MatchesRepo.countMatchesByEventId(event_id);
    const event = await EventService.getEventById(event_id);
    await MatchmakingService.createMatch({participant_id, opponent_id, live, event_id, number: eventMatchesCount + 1, manual: !event.manual_matching});

    response.status(200);
    response.json({success: true});
}));

express.get('/deleteMatch/:match_id', routeHandler(async (request, response) => {
    const {match_id} = request.params;
    await MatchmakingService.deleteMatch(match_id);

    response.status(200);
    response.json({success: true});
}))
