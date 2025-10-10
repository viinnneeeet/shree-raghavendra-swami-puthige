// utils/encryptedStorage.js
import CryptoJS from 'crypto-js';

// use a strong secret key (store in env or config)
const SECRET_KEY = import.meta.env.VITE_CACHE_SECRET || 'fallback-key';

export const encryptedStorage = {
  setItem: (key, value) => {
    const encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(value),
      SECRET_KEY
    ).toString();
    localStorage.setItem(key, encrypted);
  },
  getItem: (key) => {
    const encrypted = localStorage.getItem(key);
    if (!encrypted) return null;

    try {
      const bytes = CryptoJS.AES.decrypt(encrypted, SECRET_KEY);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      return JSON.parse(decrypted);
    } catch (err) {
      console.error('Decryption failed, clearing cache:', err);
      localStorage.removeItem(key);
      return null;
    }
  },
  removeItem: (key) => {
    localStorage.removeItem(key);
  },
};
