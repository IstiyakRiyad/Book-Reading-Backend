const router = require('express').Router();
const Category = require('../../models/category');


router.get('/', async (req, res, next) => {
    try {

        const categorys = await Category
            .find({}, {__v: 0})
            .sort({_id: -1});


        res.json({
            message: 'All category details',
            categorys
        });
    }
    catch(error) {
        next(error);
    }
});

module.exports = router;