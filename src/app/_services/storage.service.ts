import { Injectable } from '@angular/core';
import {User} from "../../entities/user";

const USER_KEY = 'authenticated-user';
const REFRESH_TOKEN = 'refresh-token';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  saveUser(user : User){
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  getSavedUser() : User | null {
    const user = window.localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }

  saveRefreshToken(refreshToken: string) {
    window.sessionStorage.removeItem(REFRESH_TOKEN);
    window.sessionStorage.setItem(REFRESH_TOKEN, JSON.stringify(refreshToken));
  }

  getRefreshToken() {
    const refreshToken = window.sessionStorage.getItem(REFRESH_TOKEN);
    if (refreshToken) {
      return JSON.parse(refreshToken);
    }
    return null;
  }

  clean(): void {
    window.localStorage.clear();
  }
}
