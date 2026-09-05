import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage, isFirebaseConfigured } from './config';

/**
 * Uploads an image file to Firebase Storage or converts to Base64 data URL if storage is unavailable.
 * @param {File} file - Image File object
 * @param {string} path - Storage path, e.g. 'products/apple.jpg' or 'brand/logo.png'
 * @returns {Promise<string>} Download URL or Base64 String
 */
export const uploadImage = async (file, path) => {
  if (!file) return '';

  if (isFirebaseConfigured && storage) {
    try {
      const storageRef = ref(storage, `${path}/${Date.now()}_${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadUrl = await getDownloadURL(snapshot.ref);
      return downloadUrl;
    } catch (error) {
      console.warn('Firebase Storage upload failed, using local Base64 preview:', error);
      return await fileToBase64(file);
    }
  } else {
    // Convert file to Base64 data URL for local storage demo mode
    return await fileToBase64(file);
  }
};

/**
 * Converts a file object to a base64 string
 */
export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};
