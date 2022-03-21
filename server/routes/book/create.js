const router = require('express').Router();
const createError = require('http-errors');
const {upload, saveImage} = require('../../utils/imageStore');
const {saveFile} = require('../../utils/saveFiles');
const Book = require('../../models/book');


router.post('/', upload.fields([{name: 'image', maxCount: 1}, {name: 'pdfFile', maxCount: 1}, {name: 'audioFile', maxCount: 1}]), async (req, res, next) => {
    try {
        const {
            name, 
            price,
            page,
            description,
            writerId,
            publisherId,
            categoryId,
            subCategoryId,
            isbn,
            year,
            edition
        } = req.body;

        if(!req.files || !req.files.image) throw createError(422, 'Image must be provided');

        const image = await saveImage(req.files.image[0]);

        let pdfFile, audioFile;
        if(req.files && req.files.pdfFile) {
            pdfFile = await saveFile(req.files.pdfFile[0]);
        }

        if(req.files && req.files.audioFile) {
            audioFile = await saveFile(req.files.audioFile[0]);
        }

        await new Book({
            name, 
            image,
            price,
            page,
            description,
            writerId,
            publisherId,
            categoryId,
            subCategoryId,
            isbn,
            year,
            edition,
            pdfFile,
            audioFile
        }).save();

        res.json({
            message: 'Book is created successfully'
        });
    }
    catch(error) {
        next(error);
    }
});

module.exports = router;