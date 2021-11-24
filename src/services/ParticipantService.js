const ParticipantRepo = require('../db/repositories/ParticipantRepo');

class ParticipantService {

    static async upsertParticipant(participant) {
        participant.status = (participant.status && participant.id) ? participant.status : "saved";
        const newParticipant = await ParticipantRepo.upsertParticipant(participant);

        return ParticipantRepo.toParticipant(newParticipant);
    }

    static async findParticipantByPayload(payload) {
        const participant = await ParticipantRepo.findParticipantByPayload(payload);

        return participant ? ParticipantRepo.toParticipant(participant) : false;
    }

}

module.exports = ParticipantService;
