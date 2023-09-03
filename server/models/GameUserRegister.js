const mongoose = require('mongoose');

const GameUserRegisterSchema = mongoose.Schema({
    TeamLeader: {
        type: Object, 
    }, 
    Player2: {
        type: Object, 
    },
    Player3: {
        type: Object,
    },
    Player4: {
        type: Object,
    }
}, {timestamps : true});

module.exports = mongoose.model('GameUserRegister', GameUserRegisterSchema);
