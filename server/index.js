const dotenv = require('dotenv')
dotenv.config({path: "./.env"});

const express = require('express');
const mongoose = require('./config/mongoose');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const { CLIENT_URL } = require('./constants/urls');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(bodyParser.json());

app.use(cors(
    {
        origin: CLIENT_URL
    }
));

app.use('/', require('./routes'));

const PORT = 8000;
app.listen(PORT, ()=>{
    console.log("Server running on port", PORT)
})