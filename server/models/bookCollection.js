const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const bookCollectionSchema = Schema({
    type: {
        type: String,
        default: 'class'
    },
    name: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        default: 0
    },
    books: {
        type: [Schema.Types.ObjectId],
        ref: 'book'
    }
}, {timestamps: true});


const BookCollection = mongoose.model('bookCollection', bookCollectionSchema);


module.exports = BookCollection;