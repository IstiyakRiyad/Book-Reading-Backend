const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const publisherSchema = Schema({
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
    // numberOfBooks: {
    //     type: Number,
    //     default: 0
    // }
}, {timestamps: true});


const Publisher = mongoose.model('publisher', publisherSchema);


module.exports = Publisher;