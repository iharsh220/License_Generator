const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

const keysDir = path.join(__dirname, './keys');
const licensesDir = path.join(__dirname, './licenses');

// Validate the license
function validateLicense() {
    const publicKey = fs.readFileSync(path.join(keysDir, 'public.pem'), 'utf8');
    const license = JSON.parse(fs.readFileSync(path.join(licensesDir, 'license.json'), 'utf8'));

    const { data, signature } = license;
    const verifier = crypto.createVerify('RSA-SHA256');
    verifier.update(JSON.stringify(data));
    verifier.end();

    const isValid = verifier.verify(publicKey, signature, 'base64');

    if (isValid) {
        console.log('License is valid:', data);
    } else {
        console.error('Invalid license!');
    }
}

module.exports = { validateLicense };
