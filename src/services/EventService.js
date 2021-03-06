const EventRepo = require('../db/repositories/EventRepo');
const StadiumRepo = require('../db/repositories/StadiumRepo');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class EventService {

    static async getEventById(id) {
        return EventRepo.toEvent(await EventRepo.getById(id));
    }

    static async getEventsByStadiumId(stadiumId, filter = {}, page = 0) {
        let filterQuery = {};
        switch (filter.dateFilter){
            case "today":
                filterQuery = {event_date: new Date()};
            break;
            case "upcoming":
                filterQuery = {event_date: {[Op.gt]: new Date()}};
            break;
            case "past":
                filterQuery = {event_date: {[Op.lt]: new Date()}};
            break;
            default:
                if (filter.dateFilter) {
                    filterQuery = {event_date: new Date(filter.dateFilter)};
                }
            break;
        }
        if (filter.country) filterQuery.country = filter.country;
        if (filter.state) filterQuery.state = filter.state;
        if (filter.city) filterQuery.city = filter.city;
        if (filter.type) filterQuery.is_special = filter.type === "special";
        if (filter.search) {
            filterQuery[Op.or] = {
                title: {[Op.iLike]: '%'+filter.search+'%'},
            };
        }
        const order = (filter.sort === "za") ? [['id', 'DESC']] : [['id', 'ASC']];
        const events = await EventRepo.getEventsByStadiumId(stadiumId, filterQuery, page, order);

        return events.map(EventRepo.toEvent);
    }

    static async getOngoingEventsByStadiumId(stadiumId) {
        const events = await EventRepo.getOngoingEventsByStadiumId(stadiumId);

        return events.map(EventRepo.toEvent);
    }

    static async countEventsByStadiumId(stadiumId) {
        return await EventRepo.countEventsByStadiumId(stadiumId);
    }

    static async upsertEvent(event) {
        event.type = event.type?.join(',');
        const newEvent = await EventRepo.upsertEvent(event);
        newEvent.stadium = await StadiumRepo.getById(newEvent.stadium_id);

        return EventRepo.toEvent(newEvent);
    }

    static async removeEvent(event_id) {
        return await EventRepo.removeEvent(event_id);
    }

    static async getFastestMatchesByStadium(stadium_id) {
        const events = await EventRepo.getFastestMatchesByStadium(stadium_id);
        return events.reduce((result, e) => {
            e.matches = e.matches.filter(em => em.result !== null);
            if (e.matches.length > 0) {
                result.push(EventRepo.toEvent(e));
            }
            return result;
        }, []);
    }
}

module.exports = EventService;
