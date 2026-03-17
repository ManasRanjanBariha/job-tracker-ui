import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  setWithExpiry(key: string, value: any, ttl: number) {
    const now = new Date();

    const item = {
      value: value,
      expiry: now.getTime() + ttl, // ttl in milliseconds
    };

    localStorage.setItem(key, JSON.stringify(item));
  }
  set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  getValue(key: string) {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
      return null;
    }
    const item = JSON.parse(itemStr);
    const now = new Date();
    if (now.getTime() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    } 
    return item.value;
  }
  get(key: string) {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
      return null;
    }
    return JSON.parse(itemStr);
  }
}
