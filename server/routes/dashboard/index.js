const router = require('express').Router();
const Book = require('../../models/book');
const Author = require('../../models/author');
const Publisher = require('../../models/publisher');
const User = require('../../models/user');


router.get('/', async (req, res, next) => {
    try {
        const authorCount = await Author.countDocuments();
        const publisherCount = await Publisher.countDocuments();
        const userCount = await User.countDocuments();
        const bookCount = await Book.countDocuments();


        res.json({
            message: 'Dashboard data',
            data: {
                authorCount,
                publisherCount,
                userCount,
                bookCount
            }
        })
    }
    catch(error) {
        next(error);
    }
})

module.exports = router;