"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encryptText = encryptText;
exports.decryptText = decryptText;
const node_crypto_1 = require("node:crypto");
const env_js_1 = require("../config/env.js");
const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 12;
function getKey() {
    // Deriva uma chave de 32 bytes estável a partir da variável de ambiente.
    return (0, node_crypto_1.createHash)('sha256').update(env_js_1.env.dataEncryptionKey).digest();
}
function encryptText(plaintext) {
    const iv = (0, node_crypto_1.randomBytes)(IV_LENGTH);
    const cipher = (0, node_crypto_1.createCipheriv)(ALGORITHM, getKey(), iv);
    const encrypted = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
    const authTag = cipher.getAuthTag();
    return [iv.toString('hex'), authTag.toString('hex'), encrypted.toString('hex')].join(':');
}
function decryptText(ciphertext) {
    const [ivHex, authTagHex, encryptedHex] = ciphertext.split(':');
    if (!ivHex || !authTagHex || !encryptedHex) {
        throw new Error('Payload criptografado inválido.');
    }
    const decipher = (0, node_crypto_1.createDecipheriv)(ALGORITHM, getKey(), Buffer.from(ivHex, 'hex'));
    decipher.setAuthTag(Buffer.from(authTagHex, 'hex'));
    const decrypted = Buffer.concat([
        decipher.update(Buffer.from(encryptedHex, 'hex')),
        decipher.final(),
    ]);
    return decrypted.toString('utf8');
}
