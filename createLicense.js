const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

const keysDir = path.join(__dirname, './keys');
const licensesDir = path.join(__dirname, './licenses');

// Create a license
function createLicense() {
    if (!fs.existsSync(licensesDir)) {
        fs.mkdirSync(licensesDir);
    }

    const privateKey = fs.readFileSync(path.join(keysDir, 'private.pem'), 'utf8');

    // Calculate expiration date (30 days from today)
    const today = new Date();
    const validUntil = new Date(today);
    validUntil.setDate(today.getDate() + 30);

    const licenseData = {
        user: 'john.doe@example.com',
        licenseType: 'premium',
        issuedAt: today.toISOString(),
        validUntil: validUntil.toISOString(),
    };

    const licenseString = JSON.stringify(licenseData);

    const signer = crypto.createSign('RSA-SHA256');
    signer.update(licenseString);
    signer.end();
    const signature = signer.sign(privateKey, 'base64');

    const license = { data: licenseData, signature };
    fs.writeFileSync(path.join(licensesDir, 'license.json'), JSON.stringify(license, null, 2));

    console.log('License created and saved in the licenses folder.');
}

module.exports = { createLicense };
