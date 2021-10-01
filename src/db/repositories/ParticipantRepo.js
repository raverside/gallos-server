const {participants} = require('../models');
const Sequelize = require('sequelize');

class ParticipantRepo {

    toParticipant(participant) {
        return {
            id: participant.id,
            cage: participant.cage,
            image: participant.image,
            image_flipped: participant.image_flipped,
            team_id: participant.team_id,
            event_id: participant.event_id,
            stadium_id: participant.stadium_id,
            betting_pref: participant.betting_pref,
            betting_amount: participant.betting_amount,
            owner_account_number: participant.owner_account_number,
            type: participant.type,
            color: participant.color,
            cresta: participant.cresta,
            alas: participant.alas,
            pata: participant.pata,
            breeder_id: participant.breeder_id,
            breeder_name: participant.breeder_name,
            weight: participant.weight,
            participated_before: participant.participated_before,
            physical_advantage: participant.physical_advantage,
            status: participant.status,
            reason: participant.reason,
        }
    }

    async getById(id) {
        // return await events.findOne({where: {id}, include: [stadiums]});
    }

    async getApprovedByEventId(event_id) {
        return await participants.findAll({where: {event_id, status: "approved"}, order: Sequelize.literal('random()')});
    }

    async upsertParticipant(participant) {
        if (participant.id) {
            await participants.update(participant, {where: {id: participant.id}});
            return participant;
        } else {
            return await participants.create(participant);
        }
    }

}

module.exports = new ParticipantRepo();