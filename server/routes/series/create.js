const router = require('express').Router();
const createError = require('http-errors');
const BookCollection = require('../../models/bookCollection');


router.post('/', async (req, res, next) => {
    try {
        const {name, books} = req.body;

        await new BookCollection({
            type: 'series',
            name,
            books
        }).save();

        res.json({
            message: 'Series is created successfully'
        });
    }
    catch(error) {
        next(error);
    }
});

module.exports = router;