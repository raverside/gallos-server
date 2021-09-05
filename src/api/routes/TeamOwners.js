const express = require('../express');
const routeHandler = require('../routeHandler');
const TeamOwnerService = require('../../services/TeamOwnerService');

express.get('/getTeamOwner/:id', routeHandler(async (request, response) => {
    const {id} = request.params;
    const team_owner = await TeamOwnerService.getTeamOwnerById(id);

    response.status(200);
    response.json({team_owner});
}));

express.get('/getTeamOwners', routeHandler(async (request, response) => {
    const team_owners = await TeamOwnerService.getTeamOwners();
    const all_teams = await TeamOwnerService.getAllTeams();

    response.status(200);
    response.json({team_owners: {
        account: team_owners,
        team: all_teams
    }});
}));

express.post('/upsertTeamOwner', routeHandler(async (request, response) => {
    await TeamOwnerService.upsertTeamOwner(request.body);

    response.status(200);
    response.json({success: true});
}));

express.post(`/addTeamOwnerTeam`, routeHandler(async (request, response) => {
    const {id, payload} = request.body;
    payload.map((team) => {
        TeamOwnerService.createTeam(id, team);
    });

    response.status(200);
    response.json({success: true});
}));
