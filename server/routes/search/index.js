const router = require('express').Router();
const Book = require('../../models/book');

router.post('/', async (req, res, next) => {
    try {
        const {
            search_query,
            sort,
            category,
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
                subCategory: {$in: category},
                $or: ratings.map(rating => ({rating: {$gte: rating, $lt: Math.floor(rating + 1)}}))
            }, {_id: 1, name: 1, image: 1, rating: 1, numberOfRating: 1, writer: 1, pdfFile: 1, audioFile: 1})
            .sort({
                price: price ? 1 : -1,
                _id: date ? 1 : -1,
                name: name ? 1 : -1,
            })
            .populate('writer', '_id name');
        
        res.json({
            message: 'Filter and search data',
            books
        });

    }
    catch( error ) {
        next(error);
    }
});

module.exports = router;