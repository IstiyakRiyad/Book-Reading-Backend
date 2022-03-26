const router = require('express').Router();
const BookCollection = require('../../models/bookCollection');



router.put('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;

        const {bookId} = req.body;

        await BookCollection.findOneAndUpdate({_id: id}, {$push: {books: bookId}});


        res.json({
            message: 'Book is added to the collection successfully'
        });
    }
    catch(error) {
        next(error);
    }
});

module.exports = router;