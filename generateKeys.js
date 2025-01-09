const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

const keysDir = path.join(__dirname, './keys');

// Generate RSA key pair
function generateKeyPair() {
    if (!fs.existsSync(keysDir)) {
        fs.mkdirSync(keysDir);
    }

    const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
    });

    fs.writeFileSync(path.join(keysDir, 'private.pem'), privateKey.export({ type: 'pkcs1', format: 'pem' }));
    fs.writeFileSync(path.join(keysDir, 'public.pem'), publicKey.export({ type: 'spki', format: 'pem' }));

    console.log('Keys generated and saved in the keys folder.');
}

module.exports = { generateKeyPair };
