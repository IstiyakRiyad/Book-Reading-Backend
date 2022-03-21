const router = require('express').Router();
const Author = require('../../models/author');
const createError = require('http-errors');


router.get('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;

        const author = await Author.findOne({_id: id}, {__v: 0});

        if(!author) throw createError(404, 'Author not found');

        
        res.json({
            message: 'All author details',
            author
        });
    }
    catch(error) {
        next(error);
    }
});

module.exports = router;