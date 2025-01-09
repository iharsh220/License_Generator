const { generateKeyPair } = require('./generateKeys');
const { createLicense } = require('./createLicense');
const { validateLicense } = require('./validateLicense');

function main() {
    console.log('Generating keys...');
    generateKeyPair();

    console.log('Creating license...');
    createLicense();

    console.log('Validating license...');
    validateLicense();
}

main();
