const enforcePermissionPolicy = require("./permissions");

module.exports = function routeHandler(cb, options) {
    options = { enforceLogin: true, ...options };

    return async (req, res, ...rest) => {
        try {
            if (!(await enforcePermissionPolicy(req, res, options))) return;

            return await cb(req, res, ...rest);
        } catch (err) {
            console.log(err);
            res.status(500).send("Internal error");
        }
    };
}
