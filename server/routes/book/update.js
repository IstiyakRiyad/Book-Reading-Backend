const router = require('express').Router();
const {upload, saveImage, deleteImage} = require('../../utils/imageStore');
const {saveFile, deleteFile} = require('../../utils/saveFiles');
const Book = require('../../models/book');


router.patch('/:id', upload.fields([{name: 'image', maxCount: 1}, {name: 'pdfFile', maxCount: 1}, {name: 'audioFile', maxCount: 1}]), async (req, res, next) => {
    try {
        const {id} = req.params;
        const {
            name, 
            price,
            page,
            description,
            writerId,
            publisherId,
            categoryId,
            subCategoryId,
            language,
            year,
            edition
        } = req.body;


        const updateData = {};

        if(name) updateData.name = name; 
        if(price) updateData.price = price;
        if(page) updateData.page = page;
        if(description) updateData.description = description;
        if(writerId) updateData.writer = writerId;
        if(publisherId) updateData.publisher = publisherId;
        if(categoryId) updateData.category = categoryId;
        if(subCategoryId) updateData.subCategory = subCategoryId;
        if(language) updateData.language = language;
        if(year) updateData.year = year;
        if(edition) updateData.edition = edition;

        if(!req.files && !req.files.image[0]) {
            updateData.image = await saveImage(req.files.image[0]);
        }

        if(!req.files && !req.files.pdfFile[0]) {
            updateData.pdfFile = await saveFile(req.files.pdfFile[0]);
        }

        if(!req.files && !req.files.audioFile[0]) {
            updateData.audioFile = await saveFile(req.files.audioFile[0]);
        }


        const book = await Book.findOneAndUpdate({_id: id}, {$set: updateData});


        res.json({
            message: 'Book is updated successfully'
        });

        // Delete the files
        if(!req.files && !req.files.image[0]) {
            await deleteImage(book.image[0]);
        }

        if(!req.files && !req.files.pdfFile[0]) {
            await deleteFile(book.pdfFile[0]);
        }

        if(!req.files && !req.files.audioFile[0]) {
            await deleteFile(book.audioFile[0]);
        }
    }
    catch(error) {
        next(error);
    }
});

module.exports = router;