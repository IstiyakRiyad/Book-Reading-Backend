const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    hash: {
        type: String
    },
    salt: {
        type: String
    },
    email: {
        type: String
    },
    role: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: 'default.png'
    },
    sessions: {
        type: Array,
    }
}, {timestamps: true});


const User = mongoose.model('user', userSchema);


module.exports = User;