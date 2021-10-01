const express = require('../express');
const routeHandler = require('../routeHandler');
const EventService = require('../../services/EventService');
const multer  = require('multer');
const upload = multer({ dest: 'public/uploads/' }).single('event');
const EventRepo = require('../../db/repositories/EventRepo');

express.get('/getEvent/:id', routeHandler(async (request, response) => {
    const {id} = request.params;
    const event = await EventService.getEventById(id);

    response.status(200);
    response.json({event});
}));

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
    const stadium_id = request.currentUser.get('stadium_id');
    const events = await EventService.getEventsByStadiumId(stadium_id, filter, page);
    const eventCount = await EventService.countEventsByStadiumId(stadium_id);

    response.status(200);
    response.json({events, eventCount});
}));

express.get('/removeEvent/:event_id', routeHandler(async (request, response) => {
    const {event_id} = request.params;
    await EventService.removeEvent(event_id);

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
    EventRepo.updateEvent({id: event_id, phase: "on going"});

    response.status(200);
    response.json({success:true});
}));
