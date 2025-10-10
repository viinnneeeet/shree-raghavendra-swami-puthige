// utils/secureStorage.js
import CryptoJS from 'crypto-js';

const SECRET_KEY =
  import.meta.env.VITE_APP_SECRET_KEY || 'super-secret-fallback'; // 🔒 use .env

export const secureStorage = {
  set: (key, value) => {
    try {
      const encrypted = CryptoJS.AES.encrypt(
        JSON.stringify(value),
        SECRET_KEY
      ).toString();
      localStorage.setItem(key, encrypted);
    } catch (err) {
      console.error('Encryption error:', err);
    }
  },

  get: (key) => {
    try {
      const encrypted = localStorage.getItem(key);
      if (!encrypted) return null;

      const bytes = CryptoJS.AES.decrypt(encrypted, SECRET_KEY);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      return JSON.parse(decrypted);
    } catch (err) {
      console.error('Decryption error, clearing data:', err);
      localStorage.removeItem(key);
      return null;
    }
  },

  remove: (key) => {
    localStorage.removeItem(key);
  },
};
