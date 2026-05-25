class StorageService {
  static get(key) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      console.error("StorageService Error reading key:", key, e);
      return null;
    }
  }

  static set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error("StorageService Error writing key:", key, e);
    }
  }

  static remove(key) {
    localStorage.removeItem(key);
  }
}

export default StorageService;