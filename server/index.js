const dotenv = require('dotenv')
dotenv.config({path: "./.env"});

const express = require('express');
const mongoose = require('./config/mongoose');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const { CLIENT_URL } = require('./constants/urls');
const passport = require('passport')
const passportLocalStrategy = require('passport-local');
const passportGoogleAuth = require('passport-google-oauth');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const { setResponse, setAuthenticatedUser } = require('./middlewares');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(bodyParser.json());

app.use(cors(
    {
        origin: '*',
        credentials: true
    }
));

app.use(session({
    secret: 'radhe-radhe',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: (1000*60*100),
        secure: false,
        sameSite: false,
    }, 
    store: MongoStore.create(
        {
            mongoUrl: process.env.DB_URL,
            autoRemove: 'disabled'
        },
        function(err){
            console.log(err || 'connection to mongo-connect ok!');
        }
    )
}));

// KEEP THEM ABOVE ROUTES
app.use(passport.initialize());
app.use(passport.session());

app.use('/', setResponse, setAuthenticatedUser, require('./routes'));

const PORT = 8000;
app.listen(PORT, ()=>{
    console.log("Server running on port", PORT)
})