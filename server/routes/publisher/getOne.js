const router = require('express').Router();
const Publisher = require('../../models/publisher');
const createError = require('http-errors');


router.get('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;

        const publisher = await Publisher.findOne({_id: id}, {__v: 0});

        if(!publisher) throw createError(404, 'Publisher not found');

        // TODO: Adding publisher books

        publisher.books = [];
        
        res.json({
            message: 'All Publisher details',
            publisher
        });
    }
    catch(error) {
        next(error);
    }
});

module.exports = router;