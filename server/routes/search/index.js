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
            }, {_id: 1, name: 1, image: 1})
            .sort({
                price: price ? 1 : -1,
                _id: date ? 1 : -1,
                name: name ? 1 : -1,
            });
        
        res.json({
            message: 'Filter data',
            books
        });

    }
    catch( error ) {
        next(error);
    }
});

module.exports = router;