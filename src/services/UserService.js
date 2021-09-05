const UserRepo = require('../db/repositories/UserRepo');
const AuthService = require('./AuthService');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class UserService {

    static async getUserById(id) {
        return UserRepo.toUser(await UserRepo.getUserById(id));
    }

    static async getUsers(filter = {}, page = 0) {
        let filterQuery = {};
        if (filter.country) filterQuery.country = filter.country;
        // if (filter.state) filterQuery.state = {state: filter.state};
        if (filter.city) filterQuery.city = filter.city;
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

    static async updateUserProfile(id, phone, passcode) {
        const updatedValues = {phone};
        if (passcode) {
            const cleanPasscode = passcode.toUpperCase().replace(/\s/g, '');
            updatedValues.passcode = await AuthService.hashPasscode(cleanPasscode);
        }

        return await UserRepo.updateUser(id, updatedValues);
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
}

module.exports = UserService;
