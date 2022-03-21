const router = require('express').Router();
const SubCategory = require('../../models/subCategory');


router.get('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        
        const subCategorys = await SubCategory
            .find({categoryId: id}, {__v: 0})
            .sort({_id: -1});


        res.json({
            message: 'All sub category details',
            subCategorys
        });
    }
    catch(error) {
        next(error);
    }
});

module.exports = router;