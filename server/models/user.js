const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        default: false
    },
    phone: {
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