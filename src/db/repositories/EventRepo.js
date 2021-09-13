const {events} = require('../models');
const {stadiums} = require('../models');
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
            bronze: event.bronze,
            silver_one: event.silver_one,
            silver_two: event.silver_two,
            gold_one: event.gold_one,
            gold_two: event.gold_two,
            stadium_id: event.stadium_id,
            stadium_name: event.stadium.name,
            stadium_image: event.stadium.image
        }
    }

    async getById(id) {
        return await events.findOne({where: {id}, include: [stadiums]});
    }

    async getEventsByStadiumId(stadium_id, filterQuery, page, order) {
        const limit = 5;
        const offset = limit * page;
        return await events.findAll({where: {...{stadium_id}, ...filterQuery}, order, limit, offset, include: [stadiums]});
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

    async removeEvent(id) {
        return await events.destroy({where: {id}});
    }

}

module.exports = new EventRepo();
