const router = require('express').Router();
const Book = require('../../models/book');
const pagination = require('../../utils/pagination');


router.get('/', async (req, res, next) => {
    try {
        const totalCount = await Book.find({}).countDocuments();

        const {skip, limit} = pagination(req.query, totalCount);

        const books = await Book
            .find({}, {_id: 1, name: 1, image: 1})
            .sort({_id: -1})
            .skip(skip)
            .limit(limit);


        res.json({
            message: 'All author details',
            books: {
                pageCount: Math.ceil(totalCount / limit),
                itemCount: totalCount,
                items: books
            }
        });
    }
    catch(error) {
        next(error);
    }
});

module.exports = router;