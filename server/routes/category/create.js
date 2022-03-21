const router = require('express').Router();
const Category = require('../../models/category');


router.post('/', async (req, res, next) => {
    try {
        const {name} = req.body;

        await new Category({
            name
        }).save();

        res.json({
            message: 'Category is created successfully'
        });
    }
    catch(error) {
        next(error);
    }
});

module.exports = router;