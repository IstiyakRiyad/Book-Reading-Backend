const router = require('express').Router();
const {deleteImage} = require('../../utils/imageStore');
const Publisher = require('../../models/publisher');
const createError = require('http-errors');


router.delete('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;

        const publisher = await Publisher.findOneAndDelete({_id: id});

        if(!publisher) throw createError(404, 'Publisher not found');

        res.json({
            message: 'Publisher is deleted successfully'
        });

        // Delete the files
        
        await deleteImage(publisher.image);
        
    }
    catch(error) {
        next(error);
    }
});

module.exports = router;