const router = require('express').Router();
const {upload, saveImage, deleteImage} = require('../../utils/imageStore');
const Publisher = require('../../models/publisher');


router.patch('/:id', upload.single('image'), async (req, res, next) => {
    try {
        const {id} = req.params;
        const {name, location} = req.body;

        const updateData = {};

        if(name) updateData.name = name;
        if(location) updateData.location = location;

        if(req.file) {
            const image = await saveImage(req.file);
            updateData.image = image;
        }


        const publisher = await Publisher.findOneAndUpdate({_id: id}, {$set: updateData});


        res.json({
            message: 'Publisher is updated successfully'
        });

        // Delete the files
        if(req.file) {
            await deleteImage(publisher.image);
        }
    }
    catch(error) {
        next(error);
    }
});

module.exports = router;