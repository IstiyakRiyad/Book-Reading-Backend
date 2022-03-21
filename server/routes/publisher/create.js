const router = require('express').Router();
const createError = require('http-errors');
const {upload, saveImage} = require('../../utils/imageStore');
const Publisher = require('../../models/publisher');


router.post('/', upload.single('image'), async (req, res, next) => {
    try {
        const {name, location} = req.body;

        if(!req.file) throw createError(422, 'Image must be provided');

        const image = await saveImage(req.file);

        await new Publisher({
            name, 
            image,
            location
        }).save();

        res.json({
            message: 'Publisher is created successfully'
        });
    }
    catch(error) {
        next(error);
    }
});

module.exports = router;