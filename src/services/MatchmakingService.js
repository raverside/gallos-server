const EventRepo = require('../db/repositories/EventRepo');
const ParticipantRepo = require('../db/repositories/ParticipantRepo');
const MatchesRepo = require('../db/repositories/MatchesRepo');

class MatchmakingService {

    static async getById(id) {
        return await MatchesRepo.getById(id);
    }

    static async generateMatches(event_id, method = 0, special_guests = []) {
        await ParticipantRepo.removeDeleted(event_id);
        await ParticipantRepo.updateParticipantCages(event_id);
        await MatchesRepo.clearMatches(event_id);
        const participants = await ParticipantRepo.getApprovedByEventId(event_id);
        const matches = [];

        if (participants.length > 0) {
            participants.forEach((participant) => {
                if (matches.find(x => x.participant_id === participant.id || x.opponent_id === participant.id)) return false;
                const match = participants.find((opponent) => {
                   if (matches.find(x => x.participant_id === opponent.id || x.opponent_id === opponent.id)) return false;
                   if (opponent.id === participant.id || opponent.team?.team_owner_id === participant.team?.team_owner_id || opponent.team_id === participant.team_id) return false;
                   if (participant.team?.team_owner?.owner_liberty.find(ml => ml.opponent_id === opponent.team?.team_owner_id)) return false;
                   if (opponent.type !== participant.type) return false;
                   if (opponent.physical_advantage !== participant.physical_advantage) return false;
                   if (opponent.betting_pref !== participant.betting_pref && participant.betting_pref !== "open" && opponent.betting_pref !== "open" && !opponent.betting_pref.includes(participant.betting_pref) && !participant.betting_pref.includes(opponent.betting_pref)) return false;
                   if (+participant.weight !== +opponent.weight) {
                       if (participant.participated_before === opponent.participated_before
                           || (+participant.weight > +opponent.weight && !participant.participated_before)
                           || (+participant.weight < +opponent.weight && !opponent.participated_before)
                       ) {
                           if (!(participant.weight <= 55.9 && (opponent.weight >= participant.weight-0.5 && opponent.weight <= participant.weight+0.5))
                               && !(participant.weight <= 64.3 && participant.weight > 55.9 && (opponent.weight > 55.9 || (opponent.weight >= participant.weight-0.5 && opponent.weight <= participant.weight+0.5)) && (opponent.weight >= participant.weight-1 && opponent.weight <= participant.weight+1))
                               && !(participant.weight <= 65.8 && participant.weight > 64.3 && (opponent.weight > 64.3 || (opponent.weight >= participant.weight-1 && opponent.weight <= participant.weight+1)) && (opponent.weight >= participant.weight-1.5 && opponent.weight <= participant.weight+1.5))
                               && !(participant.weight > 65.8 && (opponent.weight > 65.8 || (opponent.weight >= participant.weight-1.5 && opponent.weight <= participant.weight+1.5)) && (opponent.weight >= participant.weight-2 && opponent.weight <= participant.weight+2))) {
                               return false;
                           }
                       } else {
                           return false;
                       }
                   }

                   return true; // match found
                });

                if (match) matches.push({participant_id: participant.id, opponent_id: match.id, live: false, event_id});
            });
        }

        if (matches.length > 0) {
            matches.forEach((match, index) => {
                MatchesRepo.createMatch({...match, number: index + 1});
            });
        }

        return matches;
    }

    static async publishMatches({event_id, matches_limit, special_guests, method, versus_category}) {
        EventRepo.updateEvent({id: event_id, phase: "arrangement", admin_phase: null, manual_matching: (method === 0 && matches_limit === 0)});
        if (matches_limit === 0) await MatchesRepo.clearMatches(event_id);

        let matches_available = matches_limit || 0;

        if (method === 1 || method === 2) {
            special_guests.map(async (guest) => {
                const guestMatches = await MatchesRepo.getByGuestDigitalId(guest.digital_id, event_id);
                guestMatches.map(async (gm) => {
                    if (gm.opponent) {
                        gm.opponent.live = true;
                        gm.opponent.save();
                        matches_available--;
                    } else if (gm.participant) {
                        gm.participant.live = true;
                        gm.participant.save();
                        matches_available--;
                    }
                });
            });
        }

        await MatchesRepo.publishMatches(event_id, matches_available);
    }

    static async publishMatch(match_id) {
        MatchesRepo.publishMatch(match_id);
    }

    static async createMatch(match) {
        MatchesRepo.createMatch(match);
    }

    static async unmatch(match_id) {
        const match = await MatchesRepo.getById(match_id);
        return await MatchesRepo.updateMatch(match_id, {...match, opponent_id: null, participant_id: null});
    }

    static async deleteMatch(match_id) {
        MatchesRepo.deleteMatch(match_id);
    }

    static async updateMatchNumbers(event_id) {
        MatchesRepo.updateMatchNumbers(event_id);
    }

}

module.exports = MatchmakingService;
