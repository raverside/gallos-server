const express = require('../express');
const routeHandler = require('../routeHandler');
const UserRepo = require('../../db/repositories/UserRepo');
const StadiumRepo = require('../../db/repositories/StadiumRepo');
const TeamOwnerRepo = require('../../db/repositories/TeamOwnerRepo');
const EventRepo = require('../../db/repositories/EventRepo');

express.get('/getOverviewInfo', routeHandler(async (request, response) => {
    if (request.currentUser.role === 'admin') {
        response.status(200);
        response.json({
            total_transactions: 0,
            active_memberships: 0,
            today: {
                amount: 0,
                payments: 0,
                memberships: 0
            },
            users: await UserRepo.countUsers(),
            stadiums: {
                total: await StadiumRepo.countStadiums()
            },
            team_owners: await TeamOwnerRepo.countTeamOwners(),
            events: await EventRepo.countEvents()
        });
    }
}));
