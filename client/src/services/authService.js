import { db } from './mockDb';
import { configService } from '../core/classes/ConfigService';

class AuthService {
  login(username, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = db.getTable('users');
        const found = users.find(u => u.username === username && u.password === password);
        if (found) {
          resolve({ username: found.username, name: found.name, role: found.role });
        } else {
          reject(new Error("Invalid login credentials. Try again."));
        }
      }, configService.get('apiDelay'));
    });
  }

  register(userObject) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = db.getTable('users');
        if (users.some(u => u.username === userObject.username)) {
          reject(new Error("Username already taken."));
        } else {
          const newUser = db.insert('users', userObject);
          resolve(newUser);
        }
      }, configService.get('apiDelay'));
    });
  }
}

export const authService = new AuthService();