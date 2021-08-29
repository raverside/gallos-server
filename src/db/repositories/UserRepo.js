const {users} = require('../models');

class UserRepo {

    toUser(user) {
        return {
            id: user.id,
            username: user.username,
            phone: user.phone,
            country: user.country,
            city: user.city,
            photo: user.photo,
            birthday: user.birthday,
        }
    }

    async getUserById(id) {
        return await users.findOne({ where: {id} });
    }

    async getUserByUsername(username) {
        return await users.findOne({ where: {username} });
    }

}

module.exports = new UserRepo();
