const router = require('express').Router();
const Book = require('../../models/book');



router.get('/', async (req, res, next) => {
    try {

        // Audio books
        const audioBook = await Book.find(
            {audioFile: {$exists: true, $ne: null}}, 
            {_id: 1, name: 1, image: 1, rating: 1, numberOfRating: 1, writer: 1}
        )
        .sort({_id: -1})
        .populate('writer', '_id name');

        
        res.json({
            message: 'Audio book details',
            audioBook
        });
    }
    catch(error) {
        next(error);
    }
});

module.exports = router;