const router = require('express').Router();
const Author = require('../../models/author');
const createError = require('http-errors');
const pagination = require('../../utils/pagination');

router.delete('/', async (req, res, next) => {
    try {
        const {id} = req.params;

        const totalCount = await Author.find({}).countDocuments();

        const {skip, limit} = pagination(req.query);

        const authors = await Author
            .find({}, {name: 1, image: 1})
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