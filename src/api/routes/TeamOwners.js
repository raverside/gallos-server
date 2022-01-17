const express = require('../express');
const routeHandler = require('../routeHandler');
const TeamOwnerService = require('../../services/TeamOwnerService');

express.get('/getTeamOwner/:id', routeHandler(async (request, response) => {
    const {id} = request.params;
    const team_owner = await TeamOwnerService.getTeamOwnerById(id);

    response.status(200);
    response.json({team_owner});
}));

express.get('/getTeamOwnerByDigitalId/:id', routeHandler(async (request, response) => {
    const {id} = request.params;
    const team_owner = await TeamOwnerService.getTeamOwnerByDigitalId(id);

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
    const team_owner = await TeamOwnerService.upsertTeamOwner(request.body);

    response.status(200);
    response.json({success: true, team_owner});
}));

express.post(`/addTeamOwnerTeam`, routeHandler(async (request, response) => {
    const {id, payload} = request.body;
    payload.map((team) => {
        TeamOwnerService.createTeam(id, team);
    });

    response.status(200);
    response.json({success: true});
}));

express.post(`/updateTeamOwnerTeam`, routeHandler(async (request, response) => {
    const {id, name} = request.body;
    const updated = await TeamOwnerService.updateTeam(id, name);

    response.status(200);
    response.json({success: !!updated});
}));

express.post(`/removeTeamOwnerTeam`, routeHandler(async (request, response) => {
    const {id} = request.body;
    const updated = await TeamOwnerService.removeTeam(id);

    response.status(200);
    response.json({success: !!updated});
}));

express.post(`/addTeamOwnerNote`, routeHandler(async (request, response) => {
    const {id, noteTitle, note} = request.body;
    const team_owner = await TeamOwnerService.createNote(id, noteTitle, note);

    response.status(200);
    response.json({team_owner});
}));

express.post(`/updateTeamOwnerNote`, routeHandler(async (request, response) => {
    const {note_id, noteTitle, note} = request.body;
    const team_owner = await TeamOwnerService.updateNote(note_id, noteTitle, note);

    response.status(200);
    response.json({team_owner: team_owner[1][0]});
}));

express.post(`/removeTeamOwnerNote`, routeHandler(async (request, response) => {
    const {id} = request.body;
    await TeamOwnerService.removeNote(id);

    response.status(200);
    response.json({success: true});
}));

express.post(`/addTeamOwnerLiberty`, routeHandler(async (request, response) => {
    const {owner_id, reason, opponent_id} = request.body;
    const team_owner = await TeamOwnerService.createLiberty(owner_id, reason, opponent_id, false);

    response.status(200);
    response.json({team_owner});
}));

express.post(`/updateTeamOwnerLiberty`, routeHandler(async (request, response) => {
    const {id, reason, opponent_id} = request.body;
    const team_owner = await TeamOwnerService.updateLiberty(id, reason, opponent_id, false);

    response.status(200);
    response.json({team_owner: team_owner[1][0]});
}));

express.post(`/removeTeamOwnerLiberty`, routeHandler(async (request, response) => {
    const {id} = request.body;
    await TeamOwnerService.removeLiberty(id);

    response.status(200);
    response.json({success: true});
}));
