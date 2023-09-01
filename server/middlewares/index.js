const { CLIENT_URL } = require("../constants/urls");
const { DRIVER_URL } = require("../constants/urls");


module.exports.setResponse = (req, res, done) => {
    res.setHeader("Access-Control-Allow-Origin", `${CLIENT_URL}`)
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
    return done();
}

module.exports.setAuthenticatedUser = (req, res, done) => {
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    return done();
}