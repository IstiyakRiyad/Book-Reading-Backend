const { createCipheriv, timingSafeEqual } = require('crypto');
const {scrypt} = require('scrypt-js');
// Credential For hashing
const {
    base64_signer_key,
    base64_salt_separator,
} = process.env;
const rounds = parseInt(process.env.rounds);
const mem_cost = parseInt(process.env.mem_cost)


const ALGORITHM = 'aes-256-ctr'

// Should match block length (16 bytes for AES)
const IV_LENGTH = 16

// Should match algorithm (AES 256 = 256 bits = 32 bytes
const KEYLEN = 256 / 8


const base64decode = (encoded) => {
    return Buffer.from(encoded.replace(/-/g, '+').replace(/_/g, '/'), 'base64')
}


const hashPassword = async (password, salt) => {
    //return new Promise((resolve, reject) => {
        const bSalt = Buffer.concat([
            base64decode(salt),
            base64decode(base64_salt_separator),
        ]);
        
        const iv = Buffer.alloc(IV_LENGTH, 0);

        const passwordBuffer = Buffer.from(password, 'utf-8');

        // Hasing Password
        const derivedKey = await scrypt(passwordBuffer, bSalt, 2 ** mem_cost, rounds, 1, KEYLEN);

        const cipher = createCipheriv(ALGORITHM, derivedKey, iv);

        return Buffer.concat([
            cipher.update(base64decode(base64_signer_key)), 
            cipher.final() 
        ]).toString('base64');

        // scrypt(
        //     password, 
        //     bSalt, 
        //     KEYLEN,
        //     {
        //         N: 2 ** mem_cost,
        //         r: rounds,
        //         p: 1
        //     },
        //     (error, derivedKey) => {
        //         if(error) {
        //             return reject(error);
        //         }
        //         try {
        //             const cipher = createCipheriv(ALGORITHM, derivedKey, iv);
        //             resolve(
        //                 Buffer.concat([
        //                     cipher.update(base64decode(base64_signer_key)), 
        //                     cipher.final() 
        //                 ]).toString('base64')
        //             );
        //         }
        //         catch(error) {
        //             reject(error);
        //         }
        //     })
}

const checkPassword = async (password, hash, salt) => {
        const generatedHash = await hashPassword(password, salt);

        const knownHash = base64decode(hash);
        const bGeneratedHash = base64decode(generatedHash);

        if (bGeneratedHash.length !== knownHash.length) {
          // timingSafeEqual throws when buffer lengths don't match
          timingSafeEqual(knownHash, knownHash);
          return false
        }
  
        return timingSafeEqual(bGeneratedHash, knownHash);
}


module.exports = {hashPassword, checkPassword};
