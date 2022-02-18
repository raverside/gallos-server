const express = require('../express');
const routeHandler = require('../routeHandler');
const StadiumService = require('../../services/StadiumService');
const multer  = require('multer');
const upload = multer({ dest: 'public/uploads/' }).single('stadium');

express.get('/getStadium/:id', routeHandler(async (request, response) => {
    const {id} = request.params;
    const stadium = await StadiumService.getStadiumById(id);

    response.status(200);
    response.json({stadium});
}, {enforceLogin: false}));

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
}, {enforceLogin: false}));

express.get('/getAllStadiums', routeHandler(async (request, response) => {
    const stadiums = await StadiumService.getAllStadiums();

    response.status(200);
    response.json({stadiums});
}, {enforceLogin: false}));

express.post('/upsertStadium', routeHandler(async (request, response) => {
    const stadium = await StadiumService.upsertStadium(request.body);

    response.status(200);
    response.json({stadium});
}));

express.post('/uploadStadiumPicture', routeHandler(async (request, response) => {
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
