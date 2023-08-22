const { CLIENT_URL } = require("../constants/urls");

module.exports.setResponse = (req, res, done) => {
    res.setHeader("Access-Control-Allow-Origin", `${CLIENT_URL}`);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    return done();
}

module.exports.setAuthenticatedUser = (req, res, done) => {
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    return done();
}