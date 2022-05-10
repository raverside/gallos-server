const {participants, teams, team_owners, mutual_liberty} = require('../models');
const Sequelize = require('sequelize');

class ParticipantRepo {

    toParticipant(participant) {
        return {
            id: participant.id,
            cage: participant.cage,
            image: participant.image || null,
            image_flipped: participant.image_flipped || false,
            team_id: participant.team_id || null,
            event_id: participant.event_id || null,
            stadium_id: participant.stadium_id || null,
            stadium_name: participant.stadium_name || null,
            betting_pref: participant.betting_pref || null,
            betting_amount: participant.betting_amount || null,
            owner_account_number: participant.owner_account_number || null,
            type: participant.type || null,
            color: participant.color || null,
            cresta: participant.cresta || null,
            alas: participant.alas || null,
            pata: participant.pata || null,
            breeder_id: participant.breeder_id || null,
            breeder_name: participant.breeder_name || null,
            weight: participant.weight || null,
            participated_before: participant.participated_before || null,
            physical_advantage: participant.physical_advantage || null,
            status: participant.status,
            reason: participant.reason,
            observation: participant.observation || null,
            deleted: participant.deleted || false
        }
    }

    async getById(id) {
        // return await events.findOne({where: {id}, include: [stadiums]});
    }

    async getApprovedByEventId(event_id) {
        return await participants.findAll({
            where: {event_id, status: "approved", deleted: false},
            include: [
                {model:teams, include: [{model: team_owners, include: [{model: mutual_liberty, as: 'owner_liberty'}]}]}
            ],
            order: Sequelize.literal('random()')
        });
    }

    async upsertParticipant(participant) {
        if (participant.id) {
            await participants.update({...participant, deleted: false}, {where: {id: participant.id}});
            return participant;
        } else {
            const lastParticipant = await participants.findOne({where: {event_id: participant.event_id}, order: [['cage', 'DESC']]});
            const newCage = lastParticipant ? lastParticipant.cage + 1 : 1;
            return await participants.create({...participant, cage: newCage});
        }
    }

    async removeParticipant(id) {
        const participant = await participants.findOne({where: {id}});
        if (participant.deleted) {
            const deleted = await participants.destroy({where: {id}});
            await this.updateParticipantCages(participant.event_id);
            return deleted;
        } else if (participant) {
            return await participants.update(this.toParticipant({
                id: participant.id,
                event_id: participant.event_id,
                cage: participant.cage,
                status: participant.status,
                reason: participant.reason,
                deleted: true
            }), {where: {id}});
        }
    }

    async findParticipantByPayload(payload) {
        return await participants.findOne({where: payload});
    }

    async removeDeleted(event_id) {
        const participantsToDelete = await participants.findAll({where: {event_id, deleted: true}});
        const participantsIds = participantsToDelete.map((m) => m.id);
        if (!participantsIds) return false;

        return await participants.destroy({where: {id: participantsIds} });
    }

    async updateParticipantCages(event_id) {
        const allEventParticipants = await participants.findAll({where: {event_id}, order: [['cage', 'ASC']]});
        allEventParticipants.map((p, i) => {
            p.cage = i + 1;
            p.save();
        });

        return true;
    }
}

module.exports = new ParticipantRepo();
