const router = require('express').Router();
const createError = require('http-errors');
const BookCollection = require('../../models/bookCollection');


router.post('/',   async (req, res, next) => {
    try {
        const { name } = req.body;

        await new BookCollection({
            name
        }).save();

        res.json({
            message: `${name} book collection is created successfully`
        });
    }
    catch(error) {
        next(error);
    }
});

module.exports = router;