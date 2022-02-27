const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true
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
        type: Number,
        required: true
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
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    numberOfRating: {
        type: Number,
        default: 0
    },
    award: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        required: true
    },
    writerId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    publisherId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    subCategoryId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    isbn: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    edition: {
        type: Number,
        default: 1
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
    }
}, {timestamps: true});


const Book = mongoose.model('book', bookSchema);


module.exports = Book;