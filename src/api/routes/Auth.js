const express = require('../express');
const routeHandler = require('../routeHandler');
const UserRepo = require('../../db/repositories/UserRepo');
const AuthService = require('../../services/AuthService');

express.post('/loginAdmin', routeHandler(async (request, response) => {
    const {username, passcode} = request.body;
    const user = await UserRepo.getUserByUsername(username);

    const comparison = user && await AuthService.comparePasscode(passcode.replace(/ /g, ''), user.passcode);
    if (comparison) {
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
