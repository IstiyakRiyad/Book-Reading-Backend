const router = require('express').Router();
const Book = require('../../models/book');


router.get('/:subCategoryId', async (req, res, next) => {
    try {
        const {subCategoryId} = req.params;

        const books = await Book.find(
            { subCategory: subCategoryId }, 
            {_id: 1, name: 1, image: 1, rating: 1, numberOfRating: 1, writer: 1, }
        )
        .populate({ 
            path: 'writer',
            model: 'author',
            select: 'name'
        });


        res.json({
            message: 'All books of this category',
            books
        });
    }
    catch(error) {
        next(error);
    }
});

module.exports = router;