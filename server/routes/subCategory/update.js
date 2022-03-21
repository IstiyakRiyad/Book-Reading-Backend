const router = require('express').Router();
const SubCategory = require('../../models/subCategory');


router.patch('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        const {name, categoryId} = req.body;

        const updateData = {};

        if(name) updateData.name = name;
        if(categoryId) updateData.categoryId = categoryId;


        await SubCategory.findOneAndUpdate({_id: id}, {$set: updateData});


        res.json({
            message: 'Sub Category is updated successfully'
        });
    }
    catch(error) {
        next(error);
    }
});

module.exports = router;