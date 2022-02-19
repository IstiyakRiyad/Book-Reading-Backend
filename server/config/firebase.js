const {initializeApp} = require('firebase-admin/app');
const {credential} = require('firebase-admin');

// Credentials for login to firebase
const serviceAccount = require('../../secretKeys/book-reading-backend-firebase.json');

initializeApp({
    credential: credential.cert(serviceAccount)
});
