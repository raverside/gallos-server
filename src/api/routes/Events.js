const express = require('../express');
const routeHandler = require('../routeHandler');
const EventService = require('../../services/EventService');
const multer  = require('multer');
const upload = multer({ dest: 'public/uploads/' }).single('event');

express.get('/getEvents', routeHandler(async (request, response) => {
    const dateFilter = request.query.dateFilter || "today";
    const page = request.query.page || 0;
    const stadium_id = request.currentUser.get('stadium_id');
    const events = await EventService.getEventsByStadiumId(stadium_id, dateFilter, page);
    const eventCount = await EventService.countEventsByStadiumId(stadium_id);

    response.status(200);
    response.json({events, eventCount});
}));

express.post('/upsertEvent', routeHandler(async (request, response) => {
    const stadium_id = request.currentUser.get('stadium_id');
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
