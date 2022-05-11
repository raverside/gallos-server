const express = require('../express');
const routeHandler = require('../routeHandler');
const EventService = require('../../services/EventService');
const multer  = require('multer');
const upload = multer({ dest: 'public/uploads/' }).single('event');
const EventRepo = require('../../db/repositories/EventRepo');
const MatchesRepo = require('../../db/repositories/MatchesRepo');
const {sequelize} = require('../../db/models');

express.get('/getEvent/:id', routeHandler(async (request, response) => {
    const {id} = request.params;
    const event = await EventService.getEventById(id);

    response.status(200);
    response.json({event});
}, {enforceLogin: false}));

express.get('/getEvents', routeHandler(async (request, response) => {
    const filter = {
        search: request.query.search || "",
        country: request.query.country || undefined,
        state: request.query.state || undefined,
        city: request.query.city || undefined,
        type: request.query.type || undefined,
        sort: request.query.sort || "az",
        dateFilter: request.query.dateFilter,
    };
    const page = request.query.page || 0;
    const stadium_id = request.currentUser?.get('stadium_id') || false;
    const events = await EventService.getEventsByStadiumId(stadium_id, filter, page);
    const eventCount = await EventService.countEventsByStadiumId(stadium_id);

    response.status(200);
    response.json({events, eventCount});
}, {enforceLogin: false}));

express.get('/removeEvent/:event_id', routeHandler(async (request, response) => {
    const {event_id} = request.params;
    await EventService.removeEvent(event_id);

    response.status(200);
    response.json({success:true});
}));

express.post('/changeEventPhase', routeHandler(async (request, response) => {
    const {eventId, phase} = request.body;
    await EventRepo.updateEvent({id: eventId, phase});

    response.status(200);
    response.json({success:true});
}));

express.post('/changeAdminEventPhase', routeHandler(async (request, response) => {
    const {eventId, admin_phase} = request.body;
    await EventRepo.updateEvent({id: eventId, admin_phase});

    response.status(200);
    response.json({success:true});
}));

express.post('/upsertEvent', routeHandler(async (request, response) => {
    const stadium_id = request.body.stadium_id || request.currentUser.get('stadium_id');
    const event = await EventService.upsertEvent({...request.body, stadium_id});

    response.status(200);
    response.json({event});
}));

express.post('/uploadEventPicture', routeHandler(async (request, response) => {
    upload(request, response, function (err) {
        if (request.file?.filename) {
            response.status(200);
            response.json({filename: request.file.filename});
        } else if (err) {
            console.log(err);
            response.status(500);
        } else {
            response.status(500);
        }
    });
}));

express.get('/announceEvent/:event_id', routeHandler(async (request, response) => {
    const {event_id} = request.params;
    await MatchesRepo.deleteUnmatched(event_id);
    await MatchesRepo.updateMatchNumbers(event_id);
    await EventRepo.updateEvent({id: event_id, phase: "on going"});

    response.status(200);
    response.json({success:true});
}));

express.post('/statistics/:stadium_id/:type', routeHandler(async (request, response) => {
    const {type, stadium_id} = request.params;
    const {dateFilter} = request.body;
    let filterByDate = "";
    if (type === "totm" && dateFilter?.start && dateFilter?.end) {
        filterByDate = ` AND events.event_date between '${dateFilter.start}' and '${dateFilter.end}'`;
    }
    switch(type) {
        case "average":
        case "totm":
        case "twmw":
            const average = await sequelize.query(`SELECT`
                +` teams.name,`
                +` sum(case when (matches.result = 0 and matches.participant_id = participants.id) or (matches.result = 1 and matches.opponent_id = participants.id) then 1 else 0 end) wins,`
                +` sum(case when (matches.result = 0 and matches.participant_id != participants.id) or (matches.result = 1 and matches.opponent_id != participants.id) then 1 else 0 end) loses`
                +` FROM participants`
                +` JOIN events ON events.id = participants.event_id`
                +` JOIN matches ON (matches.participant_id = participants.id OR matches.opponent_id = participants.id)`
                +` JOIN teams ON teams.id = participants.team_id`
                +` WHERE events.stadium_id = '${stadium_id}'`
                +` AND matches.result IS NOT NULL`
                +  filterByDate
                +` GROUP BY participants.team_id, teams.name`
                +` ORDER BY wins DESC, loses ASC, teams.name`
            );
            response.status(200);
            response.json({statistics: average[0]});
            break;
        case "fastest":
            const fastest = await EventService.getFastestMatchesByStadium(stadium_id);
            response.status(200);
            response.json({statistics: fastest});
        break;
        default:
            response.status(500);
            response.json({error: "unknown_type"});
    }
}, {enforceLogin: false}));
