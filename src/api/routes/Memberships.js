const express = require('../express');
const routeHandler = require('../routeHandler');
const MembershipService = require('../../services/MembershipService');

express.get('/getMembership/:id', routeHandler(async (request, response) => {
    const {id} = request.params;
    const membership = await MembershipService.getMembershipById(id);

    response.status(200);
    response.json({membership});
}));

express.get('/getMemberships', routeHandler(async (request, response) => {
    const memberships = await MembershipService.getMemberships();

    response.status(200);
    response.json({memberships});
}));
