const AuthService = require('../../services/AuthService');
const UserRepo = require('../../db/repositories/UserRepo');

module.exports = async function enforceLogin(request, response) {
    const token = request.headers.authorization;
    const userId = AuthService.decodeToken(token).id;
    const user = await UserRepo.getUserById(userId);

    if (user) {
        request.currentUser = user;
        return user;
    } else {
        response.status(403);
        response.json({
            error: 'Must be logged in to use this call.'
        });
    }
    return false;
}
