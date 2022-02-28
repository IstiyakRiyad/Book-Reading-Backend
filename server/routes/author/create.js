const router = require('express').Router();
const createError = require('http-errors');
const {upload, saveImage} = require('../../utils/imageStore');
const Author = require('../../models/author');


router.post('/', upload.single('image'), async (req, res, next) => {
    try {
        const {name, birth, death, location, description} = req.body;
        
        if(!(req.file && req.file.image)) throw createError(422, 'Image must be provided');

        const image = await saveImage(req.file.image);

        await new Author({
            name, 
            image,
            birth, 
            death, 
            location, 
            description
        }).save();

        res.json({
            message: 'Author is created successfully'
        });
    }
    catch(error) {
        next(error);
    }
});

module.exports = router;