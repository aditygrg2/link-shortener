const passport = require('passport');

const successRedirector = (req, res) => {
    return res.redirect('http://localhost:3000');
}

const authenticationDataHandler = (req, res) => {
    const status = req.isAuthenticated();

    if(status){
        return res.status(200).json({
            registered: status,
            userData: res.locals.user,
        })
    }

    return res.status(200).json({
        registered: status,
        userData: null,
    })
}

module.exports = {successRedirector, authenticationDataHandler};