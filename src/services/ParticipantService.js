const ParticipantRepo = require('../db/repositories/ParticipantRepo');

class ParticipantService {

    static async upsertParticipant(participant) {
        participant.status = (participant.status && participant.id) ? participant.status : "saved";
        const newParticipant = await ParticipantRepo.upsertParticipant(participant);

        return ParticipantRepo.toParticipant(newParticipant);
    }

}

module.exports = ParticipantService;
