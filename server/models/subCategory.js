const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const subCategorySchema = Schema({
    name: {
        type: String,
        required: true
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        required: true
    }
}, {timestamps: true});


const SubCategory = mongoose.model('subcategory', subCategorySchema);


module.exports = SubCategory;