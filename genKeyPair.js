const {generateKeyPairSync} = require('crypto');
const fs = require('fs');


const keyPair = () => {
    return generateKeyPairSync('ec', {
        namedCurve: 'secp256k1',

        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        },

        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem'
        }
    });
}

const genKeyPair = () => {
    // Generate Refresh Token EC Keys
    const RefreshTokenKey = keyPair();

    fs.writeFileSync('secretKeys/refresh_token_ec_priv.pem', RefreshTokenKey.privateKey, 'utf8');
    fs.writeFileSync('secretKeys/refresh_token_ec_pub.pem', RefreshTokenKey.publicKey, 'utf8');

    // Generate Access Token EC Keys
    const AccessTokenKey = keyPair();

    fs.writeFileSync('secretKeys/access_token_ec_priv.pem', AccessTokenKey.privateKey, 'utf8');
    fs.writeFileSync('secretKeys/access_token_ec_pub.pem', AccessTokenKey.publicKey, 'utf8');
    
    console.log('\x1b[32m%s\x1b[0m', `${RefreshTokenKey.publicKey}\n${RefreshTokenKey.privateKey}`);
    console.log('\x1b[32m%s\x1b[0m', `${AccessTokenKey.publicKey}\n${AccessTokenKey.privateKey}`);
}

genKeyPair();
