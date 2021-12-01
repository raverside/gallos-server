const express = require('../express');
const routeHandler = require('../routeHandler');
const UserRepo = require('../../db/repositories/UserRepo');
const AuthService = require('../../services/AuthService');

express.post('/login', routeHandler(async (request, response) => {
    const {phone, passcode} = request.body;
    const user = await UserRepo.getUserByCredentials(phone, passcode.toUpperCase().replace(/\s/g, ''));

    if (user && user.role === "user") {
        const token = await AuthService.getToken(user.id);
        user.last_login = new Date(); user.save();
        response.status(200);
        response.json({user: UserRepo.toUser(user), token});
    } else {
        response.status(403);
        response.json({error: "wrong_credentials"});
    }
}, {enforceLogin: false}));

express.post('/loginAdmin', routeHandler(async (request, response) => {
    const {phone, passcode} = request.body;
    const user = await UserRepo.getUserByCredentials(phone, passcode.toUpperCase().replace(/\s/g, ''));

    if (user && user.role !== "user") {
        const token = await AuthService.getToken(user.id);
        user.last_login = new Date(); user.save();
        response.status(200);
        response.json({user: UserRepo.toUser(user), token});
    } else {
        response.status(403);
        response.json({error: "wrong_credentials"});
    }
}, {enforceLogin: false}));

express.get('/tokenLogin', routeHandler(async (request, response) => {
    const token = request.headers.authorization;
    const userId = AuthService.decodeToken(token).id;
    const user = await UserRepo.getUserById(userId);

    if (user) {
        user.last_login = new Date(); user.save();
        response.status(200);
        response.json({user: UserRepo.toUser(user)});
    } else {
        response.status(403);
        response.json({error: "token_expired"});
    }
}, {enforceLogin: false}));

express.post('/checkPhone', routeHandler(async (request, response) => {
    const {phone} = request.body;
    const user = await UserRepo.getUserByPhone(phone);
    if (user) {
        response.status(403);
        response.json({error: "phone_exists"});
    } else {
        response.status(200);
        response.json({success: true});
    }
}, {enforceLogin: false}));

express.post('/registerUser', routeHandler(async (request, response) => {
    const {phone, passcode} = request.body;
    const user = await UserRepo.createUser({phone, passcode});

    if (user) {
        const token = await AuthService.getToken(user.id);
        response.status(200);
        response.json({user: UserRepo.toUser(user), token});
    } else {
        response.status(403);
        response.json({error: "wrong_credentials"});
    }
}, {enforceLogin: false}));
