const router = require('express').Router();
const BookCollection = require('../../models/bookCollection');
const createError = require('http-errors');


router.delete('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;

        const series = await BookCollection.findOneAndDelete({_id: id, type: 'series'});

        if(!series) throw createError(404, 'Series not found');

        res.json({
            message: 'Series is deleted successfully'
        });
    }
    catch(error) {
        next(error);
    }
});

module.exports = router;