const router = require('express').Router();
const BookCollection = require('../../models/bookCollection');
const Author = require('../../models/author');



router.get('/', async (req, res, next) => {
    try {
        // Popular writers
        const popularAuthor = await BookCollection.findOne(
            {type: 'author'},
            {__v: 0, type: 0, count: 0, createdAt: 0, updatedAt: 0, _id: 0}
        );
        const authors = await Author.find({_id: {$in: popularAuthor.books}}, {_id: 1, name: 1, image: 1});

        const popularWriter = popularAuthor.toJSON();
        delete popularWriter.books;
        popularWriter.authors = authors ? authors : [];
        

        res.json({
            message: 'Popular Authors',
            popularAuthors: popularWriter.authors
        });
    }
    catch(error) {
        next(error);
    }
});

module.exports = router;