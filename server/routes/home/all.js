const router = require('express').Router();
const BookCollection = require('../../models/bookCollection');
const Author = require('../../models/author');
const Book = require('../../models/book');



router.get('/', async (req, res, next) => {
    try {
        // Different types of collections
        const bookClass = await BookCollection.find(
            {type: 'book'},
            {_id: 1}
        );
        
        res.json({
            message: 'Home details',
            home: bookClass.map(data => data._id)
        });
    }
    catch(error) {
        next(error);
    }
});

module.exports = router;