const express = require('../express');
const routeHandler = require('../routeHandler');
const UserService = require('../../services/UserService');

express.get('/getUser/:id', routeHandler(async (request, response) => {
    const {id} = request.params;
    const user = await UserService.getUserById(id);

    response.status(200);
    response.json({user});
}));

express.get('/getUsers', routeHandler(async (request, response) => {
    const filter = {
        search: request.query.search,
        country: request.query.country,
        state: request.query.state,
        city: request.query.city,
        membership: request.query.membership,
        sort: request.query.sort || "az",
    };
    const page = request.query.page || 0;
    const users = await UserService.getUsers(filter, page);

    response.status(200);
    response.json({users});
}));

express.post(`/updateUserProfile`, routeHandler(async (request, response) => {
    const {id, phone, passcode} = request.body;
    const user = await UserService.updateUserProfile(id, phone, passcode);

    response.status(200);
    response.json({success:true});
}));

express.post(`/updateUserLabels`, routeHandler(async (request, response) => {
    const {id, labels} = request.body;
    const user = await UserService.updateUserLabels(id, labels);

    response.status(200);
    response.json({user});
}));

express.post(`/addUserNote`, routeHandler(async (request, response) => {
    const {id, noteTitle, note} = request.body;
    const user = await UserService.createNote(id, noteTitle, note);

    response.status(200);
    response.json({user});
}));

express.post(`/updateUserNote`, routeHandler(async (request, response) => {
    const {note_id, noteTitle, note} = request.body;
    const user = await UserService.updateNote(note_id, noteTitle, note);

    response.status(200);
    response.json({user});
}));

express.post(`/removeUserNote`, routeHandler(async (request, response) => {
    const {id} = request.body;
    await UserService.removeNote(id);

    response.status(200);
    response.json({success: true});
}));
