const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const bookSeriesSchema = Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    books: {
        type: Array
    }
}, {timestamps: true});


const BookSeries = mongoose.model('bookSeries', bookSeriesSchema);


module.exports = BookSeries;