const router = require('express').Router();
const BookCollection = require('../../models/bookCollection');
const createError = require('http-errors');
const pagination = require('../../utils/pagination');

router.get('/', async (req, res, next) => {
    try {
        const totalCount = await BookCollection.find({type: 'series'}).countDocuments();

        const {skip, limit} = pagination(req.query, totalCount);

        const series = await BookCollection
            .find({type: 'series'}, {_id: 1, name: 1, books: {$slice: 3}})
            .sort({_id: -1})
            .skip(skip)
            .limit(limit)
            .populate({ 
                path: 'books',
                select: '_id name image rating numberOfRating writer',
                populate: {
                 path: 'writer',
                 model: 'author',
                 select: 'name'
                }
             });


        res.json({
            message: 'All author details',
            series: {
                pageCount: Math.ceil(totalCount / limit),
                itemCount: totalCount,
                items: series
            }
        });
    }
    catch(error) {
        next(error);
    }
});

module.exports = router;