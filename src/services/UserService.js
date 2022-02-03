const UserRepo = require('../db/repositories/UserRepo');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class UserService {

    static async getUserById(id) {
        return UserRepo.toUser(await UserRepo.getUserById(id));
    }

    static async getUsers(filter = {}, page = 0) {
        let filterQuery = {};
        if (filter.country) filterQuery.country = +filter.country;
        if (filter.state) filterQuery.state = +filter.state;
        if (filter.city) filterQuery.city = +filter.city;
        // if (filter.membership) filterQuery.membership = filter.membership;
        if (filter.search) {
            filterQuery[Op.or] = {
                username: {[Op.iLike]: '%'+filter.search+'%'},
                labels: {[Op.iLike]: '%'+filter.search+'%'},
            };
        }
        const order = (filter.sort === "za") ? [['username', 'DESC']] : [['username', 'ASC']];
        const users = await UserRepo.getUsers(filterQuery, page, order);

        return users.map(UserRepo.toUser);
    }

    static async getDashUsers(filter = {}) {
        let filterQuery = {};
        if (filter.country) filterQuery.country = +filter.country;
        if (filter.state) filterQuery.state = +filter.state;
        if (filter.city) filterQuery.city = +filter.city;
        // if (filter.membership) filterQuery.membership = filter.membership;
        if (filter.search) {
            filterQuery[Op.or] = {
                username: {[Op.iLike]: '%'+filter.search+'%'},
                labels: {[Op.iLike]: '%'+filter.search+'%'},
            };
        }
        const order = (filter.sort === "za") ? [['username', 'DESC']] : [['username', 'ASC']];
        const users = await UserRepo.getDashUsers(filterQuery, order);

        return users.map(UserRepo.toUser);
    }

    static async updateUserProfile(id, phone, passcode) {
        const updatedValues = {phone};
        if (passcode) {
            updatedValues.passcode  = passcode.toUpperCase().replace(/\s/g, '');
        }

        return await UserRepo.updateUser(id, updatedValues);
    }

    static async updateCurrentUser({id, photo, ...payload}) {
        if (photo) payload.photo = photo;
        await UserRepo.updateUser(id, payload)

        return UserRepo.toUser(await UserRepo.getUserById(id));
    }

    static async updateUserLabels(id, labels) {
        const user = await UserRepo.getUserById(id);
        user.labels = labels;
        user.save();

        return user;
    }

    static async createNote(id, noteTitle, note) {
        return UserRepo.toUser(await UserRepo.createNote(id, noteTitle, note));
    }

    static async updateNote(note_id, noteTitle, note) {
        return UserRepo.toUser(await UserRepo.updateNote(note_id, noteTitle, note));
    }

    static async removeNote(id) {
        return await UserRepo.removeNote(id);
    }

    static async getAllLabels() {
        return await UserRepo.getAllLabels();
    }

    static async upsertLabel(label) {
        return await UserRepo.upsertLabel(label);
    }

    static async deleteLabel(id) {
        return await UserRepo.deleteLabel(id);
    }
}

module.exports = UserService;
