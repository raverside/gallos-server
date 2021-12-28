const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

class AuthService {

    /**
     * Bcrypt encode the passcode
     *
     * @param passcode
     * @returns {Promise<String>}
     */
    static async hashPasscode(passcode) {
        return await bcrypt.hash(passcode, saltRounds);
    }

    /**
     * Bcrypt compare the passcode and hash
     *
     * @param passcode
     * @param hash
     * @returns {Promise<Bool>}
     */
    static async comparePasscode(passcode, hash) {
        return await bcrypt.compare(passcode, hash);
    }

    /**
     * Generate JsonWebToken from user id
     *
     * @param userId
     * @returns {Promise<String>}
     */
    static async getToken(userId) {
        return await jwt.sign(
            { id: userId },
            process.env.JWT_SECRET,
            {expiresIn: "7d"}
        )
    }

    /**
     * Retrieve data from JsonWebToken
     *
     * @param token
     * @returns {Promise<Object>}
     */
    static decodeToken(token) {
        if (!token) return false;
        return jwt.verify(token, process.env.JWT_SECRET);
    }

}

module.exports = AuthService;
