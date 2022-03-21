const path = require('path');
const fs = require('fs/promises');
const crypto = require('crypto');


const saveFile = async (file) => {
    const {buffer} = file;
    
    const fileName = `${Date.now()}${crypto.randomBytes(20).toString('hex')}.jpeg`;


    // Save the files
    await fs.writeFile(path.resolve(`data/files/${fileName}`), buffer);

    return fileName;
}


const deleteFile = async (fileName) => {
    try {
        await fs.unlink(path.resolve(`data/files/${fileName}`));
    }
    catch(error) {
        console.log(error.message);
    }
}


module.exports = {saveFile, deleteFile};