const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const authorSchema = Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    birth: {
        type: String,
        required: true
    },
    death: {
        type: String,
        default: null
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, {timestamps: true});


const Author = mongoose.model('author', authorSchema);


module.exports = Author;