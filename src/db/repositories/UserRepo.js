const {users, users_notes, stadiums, geo_countries, geo_states, geo_cities} = require('../models');
const Sequelize = require('sequelize');

class UserRepo {

    toUser(user) {
        return {
            id: user.id,
            username: user.username,
            passcode: user.passcode,
            phone: user.phone,
            country: user.countries?.name,
            state: user.states?.name,
            city: user.cities?.name,
            photo: user.photo,
            birthday: user.birthday,
            role: user.role,
            labels: user.labels,
            notes: user.user_notes,
            stadium: user.stadium,
            created_at: user.created_at,
            last_login: user.last_login,
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
        return await users.findOne({ where: {id}, include: this.includeQuery() });
    }

    async getUserByCredentials(phone, passcode) {
        return await users.findOne({ where: {
            passcode,
            phone
        }, include: this.includeQuery() });
    }

    async getUsers(filterQuery, page, order) {
        const limit = 10;
        const offset = limit * page;

        return await users.findAll({where: {...{role:"user"}, ...filterQuery}, order, offset, limit});
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
        return await users.findAll({
            attributes: [
                [Sequelize.fn('DISTINCT', Sequelize.col('labels')) ,'labels'],
            ],
            group: ["labels"],
        });
    }
}

module.exports = new UserRepo();
