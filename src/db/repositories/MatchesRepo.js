const {matches, participants} = require('../models');

class MatchesRepo {

    includeQuery() {
        return [
            {
                model: participants
            }
        ];
    }

    async getById(id) {
        return await matches.findOne({where:{id}});
    }

    async getByParticipantId(participant_id) {
        return await matches.findOne({where: {participant_id}, include: this.includeQuery()});
    }

    async getByOpponentId(opponent_id) {
        return await matches.findOne({where: {opponent_id}, include: this.includeQuery()});
    }

    async getByGuestDigitalId(digital_id, event_id) {
        return await participants.findAll({
            where: {owner_account_number: digital_id},
            include: [
                {
                    model: matches,
                    as: 'participant',
                    where: {live: false, event_id}
                },
                {
                    model: matches,
                    as: 'opponent',
                    where: {live: false, event_id}
                }]
        });
    }

    clearMatches(event_id) {
        matches.destroy({where: {event_id}});
    }

    async createMatch(match) {
        return await matches.create(match);
    }

    async publishMatches(event_id, matches_limit) {
        return await matches.update({live: true}, {where: {event_id}, limit: matches_limit});
    }

    async publishMatch(id) {
        return await matches.update({live: true}, {where: {id}});
    }

    async publishSpecial(guest_id) {
        //please make it work
        // return await matches.update({live: true}, {
        //     include: [
        //         {model: participants, as: "opponent"},
        //         {model: participants, as: "participant"},
        //     ]
        // });
    }
}

module.exports = new MatchesRepo();
