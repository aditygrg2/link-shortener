const mongoose = require('mongoose');

const LinkSchema = mongoose.Schema({
    link: {
        type: String,
        required: true
    },
    shortenedURL: {
        type: String,
        required: true,
    },
    isFree: {
        type: Boolean,
        default: true,
        required: true
    }
})

module.exports = mongoose.model('Link', LinkSchema);