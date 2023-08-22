const mongoose = require('mongoose')

const User = mongoose.Schema({
    email: {
        type: String, 
        required: true
    },
    password: {
        type: String, 
        required: true,
    },
    name: {
        type: String, 
        required: true
    },
    links: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Link'
        }
    ]
})

module.exports = mongoose.model('User', User);