const {events, stadiums, participants, teams, matches, team_owners} = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class EventRepo {

    toEvent(event) {
        return {
            id: event.id,
            title: event.title,
            description: event.description,
            is_special: event.is_special,
            image: event.image,
            currency: event.currency,
            event_date: event.event_date,
            receiving_time_start: event.receiving_time_start,
            receiving_time_end: event.receiving_time_end,
            first_race_time: event.first_race_time,
            type: event.type?.split(','),
            phase: event.phase,
            bronze: event.bronze,
            silver_one: event.silver_one,
            silver_two: event.silver_two,
            gold_one: event.gold_one,
            gold_two: event.gold_two,
            stadium_id: event.stadium_id,
            stadium_name: event.stadium.name,
            stadium_image: event.stadium.image,
            stadium_five_sec: event.stadium.five_sec,
            participants: event.participants,
            matches: event.matches,
        }
    }

    includeQuery() {
        return [
            {
                model: stadiums
            },
            {
                model: participants,
                include: {
                    model: teams,
                    include: [team_owners]
                }
            },
            {
                model: matches,
                include: [
                    {
                        model: participants,
                        as: 'participant',
                        include: {
                            model: teams,
                            include: [team_owners]
                        }
                    },
                    {
                        model: participants,
                        as: 'opponent',
                        include: {
                            model: teams,
                            include: [team_owners]
                        }
                    }
                ],
            }
        ];
    }
    async getById(id) {
        return await events.findOne({where: {id}, include: this.includeQuery(), order: [[{model: matches}, 'created_at', 'DESC'], [{model: matches}, 'id', 'DESC']]});
    }

    async getEventsByStadiumId(stadium_id, filterQuery, page, order = [[{model: matches}, 'created_at', 'DESC'], [{model: matches}, 'id', 'DESC']]) {
        const limit = 5;
        const offset = limit * page;
        return await events.findAll({where: {...{stadium_id}, ...filterQuery}, order, limit, offset, include: this.includeQuery()});
    }

    async getOngoingEventsByStadiumId(stadium_id) {
        return await events.findAll({where: {stadium_id, phase: "on going"}, include: this.includeQuery(), order: [[{model: matches}, 'created_at', 'DESC'], [{model: matches}, 'id', 'DESC']]});
    }

    async countEventsByStadiumId(stadium_id) {
        return {
            today: await events.count({where: {stadium_id, event_date: new Date()}}),
            upcoming: await events.count({where: {stadium_id, event_date: {[Op.gt]: new Date()}}}),
            past: await events.count({where: {stadium_id, event_date: {[Op.lt]: new Date()}}}),
            dates: await events.findAll({where: {stadium_id}, attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('event_date')), 'date']]})
        }
    }

    async upsertEvent(event) {
        if (event.id) {
            await events.update(event, {where: {id: event.id}});
            return event;
        } else {
            return await events.create(event);
        }
    }

    async updateEvent(event) {
        await events.update(event, {where: {id: event.id}});
        return event;
    }

    async removeEvent(id) {
        return await events.destroy({where: {id}});
    }

}

module.exports = new EventRepo();
