const express = require('../express');
const routeHandler = require('../routeHandler');
const UserService = require('../../services/UserService');
const UserRepo = require('../../db/repositories/UserRepo');
const multer  = require('multer');
const upload = multer({ dest: 'public/uploads/' }).single('user');

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

express.get('/getDashUsers', routeHandler(async (request, response) => {
    const filter = {
        search: request.query.search,
        country: request.query.country,
        state: request.query.state,
        city: request.query.city,
        membership: request.query.membership,
        sort: request.query.sort || "az",
    };
    const users = await UserService.getDashUsers(filter);

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
    response.json({user: user[1]});
}));

express.post(`/removeUserNote`, routeHandler(async (request, response) => {
    const {id} = request.body;
    await UserService.removeNote(id);

    response.status(200);
    response.json({success: true});
}));

express.get('/getAllLabels', routeHandler(async (request, response) => {
    const labels = await UserService.getAllLabels();

    response.status(200);
    response.json({labels: labels});
}));

express.post('/upsertUserLabel', routeHandler(async (request, response) => {
    const label = await UserService.upsertLabel(request.body);

    response.status(200);
    response.json({label});
}));

express.get('/deleteUserLabel/:id', routeHandler(async (request, response) => {
    const {id} = request.params;
    const resp = await UserService.deleteLabel(id);

    response.status(200);
    response.json({success: true});
}));

express.post('/uploadUserPicture', routeHandler(async (request, response) => {
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

express.post(`/updateCurrentUser`, routeHandler(async (request, response) => {
    const id = request.currentUser.id;
    const {username, birthday, photo, country, state, city} = request.body;
    const user = await UserService.updateCurrentUser({id, username, birthday, photo, country, state, city});

    response.status(200);
    response.json({user});
}));

express.post(`/upsertUser`, routeHandler(async (request, response) => {
    const {id, username, phone, photo, role, passcode, stadium_id} = request.body;
    const user = id ? await UserRepo.updateUser(id, {username, phone, photo, role, passcode, stadium_id}) : await UserRepo.createUser({username, phone, photo, role, passcode, stadium_id});

    response.status(200);
    response.json({user});
}));

express.post(`/toggleUserBlock`, routeHandler(async (request, response) => {
    const user = await UserRepo.getUserById(request.body.id);
    if (user) {
        user.blocked = !user.blocked;
        user.save();
    }
    response.status(200);
    response.json({success: true});
}));
