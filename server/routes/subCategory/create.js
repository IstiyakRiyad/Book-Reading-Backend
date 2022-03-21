const router = require('express').Router();
const SubCategory = require('../../models/subCategory');


router.post('/:id', async (req, res, next) => {
    try {
        const {name} = req.body;
        const {id} = req.params;

        await new SubCategory({
            name,
            categoryId: id
        }).save();

        res.json({
            message: 'Sub category is created successfully'
        });
    }
    catch(error) {
        next(error);
    }
});

module.exports = router;