const router = require('express').Router();
const Category = require('../../models/category');
const SubCategory = require('../../models/subCategory');
const createError = require('http-errors');


router.delete('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;

        const category = await Category.findOneAndDelete({_id: id});

        if(!category) throw createError(404, 'Category not found');

        await SubCategory.deleteMany({categoryId: category._id});

        res.json({
            message: 'Category is deleted successfully'
        });
    }
    catch(error) {
        next(error);
    }
});

module.exports = router;