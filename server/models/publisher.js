const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    books: {
        type: Array
    },
    numberOfBooks: {
        type: Number,
        default: 0
    }
}, {timestamps: true});


const User = mongoose.model('user', userSchema);


module.exports = User;