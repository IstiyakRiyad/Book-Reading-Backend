const router = require('express').Router();
const Publisher = require('../../models/publisher');
const createError = require('http-errors');
const pagination = require('../../utils/pagination');

router.get('/', async (req, res, next) => {
    try {
        const totalCount = await Publisher.find({}).countDocuments();

        const {skip, limit} = pagination(req.query, totalCount);

        const publishers = await Publisher
            .find({}, {_id: 1, name: 1, image: 1})
            .sort({_id: -1})
            .skip(skip)
            .limit(limit);


        res.json({
            message: 'All publisher details',
            publishers: {
                pageCount: Math.ceil(totalCount / limit),
                itemCount: totalCount,
                items: publishers
            }
        });
    }
    catch(error) {
        next(error);
    }
});

module.exports = router;