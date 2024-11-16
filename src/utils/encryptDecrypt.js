const CryptoJS = require("crypto-js");

// The secret key for encryption/decryption
const secretKey = process.env.SECRET_KEY;

// Encrypt function
function encrypt(text) {
    return CryptoJS.AES.encrypt(text, secretKey).toString();
}

// Decrypt function
function decrypt(encryptedText) {
    const bytes = CryptoJS.AES.decrypt(encryptedText, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
}

module.exports = { encrypt, decrypt };
