const router = require('express').Router();
const Category = require('../../models/category');


router.patch('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        const {name} = req.body;

        const updateData = {};

        if(name) updateData.name = name;


        await Category.findOneAndUpdate({_id: id}, {$set: updateData});


        res.json({
            message: 'Category is updated successfully'
        });
    }
    catch(error) {
        next(error);
    }
});

module.exports = router;