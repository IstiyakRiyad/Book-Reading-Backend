const router = require('express').Router();
const BookCollection = require('../../models/bookCollection');


router.patch('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        const {name, books} = req.body;

        const updateData = {};

        if(name) updateData.name = name;
        if(books) updateData.books = books;


        await BookCollection.findOneAndUpdate({_id: id}, {$set: updateData});

        res.json({
            message: 'Series is updated successfully'
        });
    }
    catch(error) {
        next(error);
    }
});

module.exports = router;