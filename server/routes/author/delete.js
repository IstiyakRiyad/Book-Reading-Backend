const router = require('express').Router();
const {deleteImage} = require('../../utils/imageStore');
const Author = require('../../models/author');
const createError = require('http-errors');


router.delete('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;

        const author = await Author.findOneAndDelete({_id: id});

        if(!author) throw createError(404, 'Author not found');

        res.json({
            message: 'Author is deleted successfully'
        });

        // Delete the files
        
        await deleteImage(author.image);
        
    }
    catch(error) {
        next(error);
    }
});

module.exports = router;