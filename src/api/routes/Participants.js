const express = require('../express');
const routeHandler = require('../routeHandler');
const ParticipantService = require('../../services/ParticipantService');
const multer  = require('multer');
const upload = multer({ dest: 'public/uploads/' }).single('participant');
const sharp = require('sharp');

express.post('/upsertParticipant', routeHandler(async (request, response) => {
    const {event_id} = request.body;
    const participant = await ParticipantService.upsertParticipant({...request.body, event_id});

    response.status(200);
    response.json({participant});
}));

express.post('/uploadParticipantPicture', routeHandler(async (request, response) => {
    upload(request, response, async function (err) {
        if (request.file?.filename) {
            await sharp(request.file.path, {failOnError: false}).resize(350, 350).toFile('public/uploads/thumb_'+request.file.filename);
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

express.post('/findParticipantByStadiumData', routeHandler(async (request, response) => {
    const {stadium_id, stadium_name} = request.body;
    const participant = await ParticipantService.findParticipantByPayload({stadium_id, stadium_name});

    response.status(200);
    response.json({participant});
}));
