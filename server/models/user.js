const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const readBookSchema = Schema({
    bookId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    currentPage: {
        type: Number,
        default: 0
    }
})

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
    },
    readBooks: {
        type: [readBookSchema],
        default: null
    }
}, {timestamps: true});


const User = mongoose.model('user', userSchema);


module.exports = User;