const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const categorySchema = Schema({
    name: {
        type: String,
        required: true
    }
}, {timestamps: true});


const Category = mongoose.model('category', categorySchema);


module.exports = Category;