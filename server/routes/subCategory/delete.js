const router = require('express').Router();
const SubCategory = require('../../models/subCategory');
const createError = require('http-errors');


router.delete('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;

        const subCategory = await SubCategory.findOneAndDelete({_id: id});

        if(!subCategory) throw createError(404, 'SubCategory not found');

        res.json({
            message: 'SubCategory is deleted successfully'
        });
    }
    catch(error) {
        next(error);
    }
});

module.exports = router;