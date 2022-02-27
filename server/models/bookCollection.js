const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const bookCollectionSchema = Schema({
    week: {
        type: Array
    },
    bestSeller: {
        type: Array
    },
    popular: {
        type: Array
    },
    selected: {
        type: Array
    },
    favourite: {
        type: Array
    },
    new: {
        type: Array
    },
    upcomming: {
        type: Array
    },
    popularWriter: {
        type: Array
    }
}, {timestamps: true});


const BookCollection = mongoose.model('bookCollection', bookCollectionSchema);


module.exports = BookCollection;