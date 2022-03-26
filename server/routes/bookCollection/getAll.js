const router = require('express').Router();
const BookCollection = require('../../models/bookCollection');


router.get('/', async (req, res, next) => {
    try {

        const collections = await BookCollection.find({}).sort({_id: -1});

        res.json({
            message: 'All collections',
            collections
        });
    }
    catch(error) {
        next(error);
    }
});

module.exports = router;