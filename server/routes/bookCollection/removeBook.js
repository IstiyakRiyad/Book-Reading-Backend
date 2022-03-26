const router = require('express').Router();
const BookCollection = require('../../models/bookCollection');



router.patch('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;

        const {bookId} = req.body;

        await BookCollection.findOneAndUpdate({_id: id}, {$pull: {books: bookId}});


        res.json({
            message: 'Book is removed from the collection successfully'
        });
    }
    catch(error) {
        next(error);
    }
});

module.exports = router;