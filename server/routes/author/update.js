const router = require('express').Router();
const {upload, saveImage, deleteImage} = require('../../utils/imageStore');
const Author = require('../../models/author');


router.patch('/:id', upload.single('image'), async (req, res, next) => {
    try {
        const {id} = req.params;
        const {name, birth, death, location, description} = req.body;

        const updateData = {};

        if(name) updateData.name = name;
        if(birth) updateData.birth = birth;
        if(death) updateData.death = death;
        if(location) updateData.location = location;
        if(description) updateData.description = description;

        if(req.file && req.file.image) {
            const image = await saveImage(req.file.image);
            updateData.image = image;
        }


        const author = await Author.findOneAndUpdate({_id: id}, {$set: updateData});


        res.json({
            message: 'Author is updated successfully'
        });

        // Delete the files
        if(req.file && req.file.image) {
            await deleteImage(author.image);
        }
    }
    catch(error) {
        next(error);
    }
});

module.exports = router;