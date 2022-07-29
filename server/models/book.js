const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    rating: {
        type: Number,
        required: true
    },
    message: {
        type: String,
        required: true
    }
}, {timestamps: true});


const bookSchema = Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number
    },
    numberOfReader: {
        type: Number,
        default: 0
    },
    like: {
        type: Number,
        default: 0
    },
    page: {
        type: Number
    },
    rating: {
        type: Number,
        default: 0
    },
    numberOfRating: {
        type: Number,
        default: 0
    },
    awards: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        required: true
    },
    writer: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'author'
    },
    publisher: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'publisher'
    },
    category: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'category'
    },
    subCategory: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'subcategory'
    },
    language: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    edition: {
        type: String
    },
    pdfFile: {
        type: String,
        default: null
    },
    audioFile: {
        type: String,
        default: null
    },
    comments: {
        type: [commentSchema],
        default: []
    },
    likes: {
        type: [Schema.Types.ObjectId],
        default: []
    }
}, {timestamps: true});


const Book = mongoose.model('book', bookSchema);


module.exports = Book;