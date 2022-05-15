const {users, users_notes, stadiums, geo_countries, geo_states, geo_cities, users_labels} = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class UserRepo {

    toUser(user) {
        return {
            id: user.id,
            username: user.username,
            passcode: user.passcode,
            phone: user.phone,
            country: user.countries?.name,
            country_id: user.country,
            state: user.states?.name,
            state_id: user.state,
            city: user.cities?.name,
            city_id: user.city,
            photo: user.photo,
            birthday: user.birthday,
            role: user.role,
            labels: user.labels,
            notes: user.user_notes,
            stadium: user.stadium,
            stadium_id: user.stadium_id,
            stadium_name: user.stadium?.name,
            created_at: user.created_at,
            last_login: user.last_login,
            blocked: user.blocked
        }
    }

    includeQuery() {
        return [
            {
                model: users_notes,
                as: 'user_notes',
                include: {model: users, as: 'creator'}
            },
            {
                model: stadiums
            },
            {
                model: geo_countries,
                as: 'countries'
            },
            {
                model: geo_states,
                as: 'states'
            },
            {
                model: geo_cities,
                as: 'cities'
            }
        ];
    }

    async getUserById(id) {
        if (!id) return false;
        return await users.findOne({ where: {id}, include: this.includeQuery() });
    }

    async createUser(user) {
        return await users.create(user);
    }

    async countUsers() {
        return {
            this_week: await users.count({where: {role: "user",created_at: {[Op.gt]: Sequelize.literal('NOW() - INTERVAL \'7d\'')}}}),
            last_week: await users.count({where: {role: "user", created_at: {[Op.lt]: Sequelize.literal('NOW() - INTERVAL \'7d\''), [Op.gt]: Sequelize.literal('NOW() - INTERVAL \'14d\'')}}}),
            total: await users.count({where: {role: "user"}})
        }
    }

    async getUserByCredentials(phone, passcode) {
        return await users.findOne({ where: {
            passcode,
            phone
        }, include: this.includeQuery() });
    }

    async getUserByPhone(phone) {
        return await users.findOne({ where: {phone}});
    }

    async getUsers(filterQuery, page, order) {
        const limit = 10;
        const offset = limit * page;

        return await users.findAll({where: {...{role:"user"}, ...filterQuery}, order, offset, limit});
    }

    async getDashUsers(filterQuery, order) {

        return await users.findAll({where: {...{role: {[Sequelize.Op.not]: "user"}}, ...filterQuery}, include: this.includeQuery(), order});
    }

    async updateUser(id, newValues) {
        return await users.update(newValues, {where: {id}});
    }

    async createNote(user_id, title, note) {
        const newNote = await users_notes.create({user_id, title, note});
        return await this.getUserById(newNote.user_id);
    }

    async updateNote(id, title, note) {
        const updatedNote = await users_notes.update({title, note}, {where: {id}, returning:true});

        return await this.getUserById(updatedNote[1]?.user_id) || false;
    }

    async removeNote(id) {
        return await users_notes.destroy({where: {id}});
    }

    async getAllLabels() {
        return await users_labels.findAll();
    }

    async upsertLabel(label) {
        if (label.id) {
            await users_labels.update(label, {where: {id: label.id}});
            return label;
        } else {
            return await users_labels.create(label);
        }
    }

    async deleteLabel(id) {
        return await users_labels.destroy({where: {id}});
    }
}

module.exports = new UserRepo();
