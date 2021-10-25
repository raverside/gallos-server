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

express.post('/upsertMembership', routeHandler(async (request, response) => {
    const membership = await MembershipService.upsertMembership({...request.body});

    response.status(200);
    response.json({success: true});
}));

express.get('/deleteMembership/:id', routeHandler(async (request, response) => {
    const {id} = request.params;
    await MembershipService.removeMembership(id);

    response.status(200);
    response.json({success: true});
}));
