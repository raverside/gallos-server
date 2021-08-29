const enforcementMap = {
    enforceLogin: require("./enforceLogin"),
};

module.exports = async function enforcePermissionPolicy(request, response, options = {}) {
    const enforcers = Object.keys(options)
        .filter((key) => options[key])
        .map((k) => enforcementMap[k]);

    for (let enforcer of enforcers) {
        if (!(await enforcer(request, response))) return;
    }

    return true;
}
