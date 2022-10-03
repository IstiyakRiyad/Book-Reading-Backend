const router = require('express').Router();
const Book = require('../../models/book');
const Author = require('../../models/author');
const Publisher = require('../../models/publisher');


router.post('/', async (req, res, next) => {
    try {
        const {
            search_query,
            sort,
            ratings
        } = req.body;

        const {
            featured,
            price,
            date,
            name,
        } = sort;

        let subQueries = [/.*/];
        if(search_query) {
            subQueries = search_query.match(/\b(\w+)\b/g).map(search => new RegExp(`${search}`, 'i'));
        }

        const books = await Book.find({
                name: {$in: subQueries},
                $or: ratings.map(rating => ({rating: {$gte: rating, $lt: Math.floor(rating + 1)}}))
            }, {_id: 1, name: 1, image: 1, rating: 1, numberOfRating: 1, writer: 1, pdfFile: 1, audioFile: 1})
            .sort({
                price: price ? 1 : -1,
                _id: date ? 1 : -1,
                name: name ? 1 : -1,
            })
            .populate('writer', '_id name');

        const authors = await Author.find({
                name: {$in: subQueries},
            }, {_id: 1, name: 1, image: 1})
            .sort({
                _id: date ? 1 : -1,
                name: name ? 1 : -1,
            });

        const publishers = await Publisher.find({
                name: {$in: subQueries},
            }, {_id: 1, name: 1, image: 1})
            .sort({
                _id: date ? 1 : -1,
                name: name ? 1 : -1,
            });
        
        
        res.json({
            message: 'Filter and search data',
            data: {
                books,
                authors,
                publishers
            }
        });

    }
    catch( error ) {
        next(error);
    }
});

module.exports = router;