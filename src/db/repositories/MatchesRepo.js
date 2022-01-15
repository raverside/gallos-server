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
        const matchesToPublish = await matches.findAll({where: {event_id}, order: [['number', 'ASC']], limit: matches_limit});
        const matchesIds = matchesToPublish.map((m) => m.id);

        return await matches.update({live: true}, {where: {id: matchesIds}});
    }

    async publishMatch(id) {
        return await matches.update({live: true}, {where: {id}});
    }

    async updateMatch(id, match) {
        return await matches.update(match, {where: {id}, returning: true});
    }

    async countMatchesByEventId(event_id) {
        return await matches.count({where: {event_id}});
    }

    async getLiveMatchesByEventId(event_id) {
        return await matches.findAll({where: {event_id, live: true}, order: [['number', 'ASC']]});
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

    async deleteMatch(id) {
        return await matches.destroy({where: {id}});
    }
}

module.exports = new MatchesRepo();
