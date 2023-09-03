const mongoose = require('mongoose');

const Notification = mongoose.Schema({
    header : {
        type : String,
    },
    subheader : {
        type : String,
    },
}, {timestamps : true})

module.exports = mongoose.model("Notification", Notification);