const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://uber6707:5PwvI3XSnQsBLNpH@cluster0.mv3pw0a.mongodb.net/`);

const db = mongoose.connection;

db.on('open', () => {
    console.log("Connection to database succeeded");
})

db.on('error', (err) => {
    console.log(err);
})

module.exports = mongoose;