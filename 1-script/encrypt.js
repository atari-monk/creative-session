// Import the CryptoJS library (make sure to include the library in your project)
const CryptoJS = require('crypto-js');

// Encryption function
function encryptText(text, secretKey) {
  // Generate a random initialization vector (IV)
  const iv = CryptoJS.lib.WordArray.random(16);

  // Convert the secret key to a WordArray
  const key = CryptoJS.enc.Utf8.parse(secretKey);

  // Encrypt the text using AES with the secret key and IV
  const ciphertext = CryptoJS.AES.encrypt(text, key, {
    iv: iv,
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC,
  });

  // Combine the IV and ciphertext into a single string
  const encryptedText = iv
    .concat(ciphertext.ciphertext)
    .toString(CryptoJS.enc.Base64);

  return encryptedText;
}

// Example usage
const textToEncrypt = 'This is the text to encrypt';
const secretKey = 'YourSecretKey';

const encryptedText = encryptText(textToEncrypt, secretKey);
console.log('Encrypted Text:', encryptedText);
