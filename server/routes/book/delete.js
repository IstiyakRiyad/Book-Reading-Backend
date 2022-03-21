const router = require('express').Router();
const {deleteImage} = require('../../utils/imageStore');
const {deleteFile} = require('../../utils/saveFiles');
const Book = require('../../models/book');
const createError = require('http-errors');


router.delete('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;

        const book = await Book.findOneAndDelete({_id: id});

        if(!book) throw createError(404, 'Book not found');

        res.json({
            message: 'Author is deleted successfully'
        });

        // Delete the files
        
        await Promise.all([
            deleteImage(book.image),
            deleteFile(book.pdfFile),
            deleteFile(book.audioFile)
        ]);
        
    }
    catch(error) {
        next(error);
    }
});

module.exports = router;