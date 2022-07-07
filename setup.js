require('dotenv').config();

const connection = require('./server/config/mongodb');
const User = require('./server/models/user');
const BookCollection = require('./server/models/bookCollection');
const db = require('mongoose').connection;
const crypto = require('crypto');
const {hashPassword} = require('./server/utils/checkPassword');

// Constants
const bookClass = require('./server/constants/bookClass');
const bookCollection = require('./server/constants/bookCollection');
const authorCollection = require('./server/constants/authorCollection');


const {
    ADMIN_NAME,
    ADMIN_PHONE,
    ADMIN_PASSWORD
} = process.env;

connection()
.then(async () => {
    try {
        // Drop the database
 //       await db.dropDatabase();
        console.log('\x1b[31m%s\x1b[0m', `Database is droped`);

        const salt = crypto.randomBytes(8).toString('base64');
        const hash = await hashPassword(ADMIN_PASSWORD, salt);

        // Create Admin
        const user = new User({
            name: ADMIN_NAME,
            phone: ADMIN_PHONE,
            hash,
            salt,
            role: 'admin'
        });

        await user.save();

        console.log('\x1b[32m%s\x1b[0m', `Admin User is created.`);

        // Create Collections
        await BookCollection.insertMany([
            ...Object.values(bookClass).map(name => ({name})),
            ...Object.values(bookCollection).map(name => ({name, type: 'book'})),
            ...Object.values(authorCollection).map(name => ({name, type: 'author'}))
        ]);

        db.close();
    }
    catch(error) {
        console.log(error.message);
        db.close();
    }
});