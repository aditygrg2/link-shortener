const passport = require('passport');
const User = require('../models/user');
const { CLIENT_URL } = require('../constants/urls');

const successRedirector = (req, res) => {
    return res.redirect(`${CLIENT_URL}`);
}

const localAuthSuccess = (req, res) => {
    return res.status(200).send({
        registered: true,
        userData: {
            email: req.user.email,
            name: req.user.name
        }
    })
}

const localAuthFailure = (err, req, res) => {
    console.log(err);

    return res.status(200).send({
        'f': 2
    })
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

const checkUser = async (req, res) => {
    const email = req.body.email;
    try{
        const user = await User.findOne({email});

        if(user){
            return res.status(200).json({
                status: true,
                userName: user.name
            })
        }
        
        return res.status(200).json({
            status: false,
            userName: ''
        })
    }
    catch(err){
        // send this
        console.log(err);
    }
}

const createUser = async (req, res, done) => {
    try{
        // Though for a normal user this is already checked once. But this check is still again done if someone fiddles with our POST route.
        const user = await User.findOne({email:req.body.email});
    
        if(!user){
            const user = await new User(req.body);
            await user.save();
            req.body = {
                email: user.email,
                password: user.password,
            }
            return done(null, user);
        }
    }
    catch(err){
        // send err
        console.log(err);
    }

    return done(null, null);
}

module.exports = {successRedirector, localAuthFailure, authenticationDataHandler, checkUser, createUser, localAuthSuccess};