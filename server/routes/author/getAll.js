const router = require('express').Router();
const Author = require('../../models/author');
const createError = require('http-errors');
const pagination = require('../../utils/pagination');

router.get('/', async (req, res, next) => {
    try {
        const totalCount = await Author.find({}).countDocuments();

        const {skip, limit} = pagination(req.query, totalCount);

        const authors = await Author
            .find({}, {_id: 1, name: 1, image: 1})
            .sort({_id: -1})
            .skip(skip)
            .limit(limit);


        res.json({
            message: 'All author details',
            authors: {
                pageCount: Math.ceil(totalCount / limit),
                itemCount: totalCount,
                items: authors
            }
        });
    }
    catch(error) {
        next(error);
    }
});

module.exports = router;