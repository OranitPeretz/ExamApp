class NotifyService {
  constructor() {
    this.listeners = [];
  }

  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(i => i !== callback);
    };
  }

  show(message, type = 'success') {
    this.listeners.forEach(callback => callback({ message, type }));
  }
}

export const notifyService = new NotifyService();