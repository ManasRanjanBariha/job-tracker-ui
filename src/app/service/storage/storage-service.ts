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
    try {
      const item = JSON.parse(itemStr);
      // Check if item has expiry and if it's expired
      if (item.expiry) {
        const now = new Date();
        if (now.getTime() > item.expiry) {
          localStorage.removeItem(key);
          return null;
        }
        return item.value;
      }
      // If no expiry, return the item as is
      return item;
    } catch (error) {
      console.error('Error parsing storage item:', error);
      localStorage.removeItem(key);
      return null;
    }
  }
  get(key: string) {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
      return null;
    }
    try {
      const item = JSON.parse(itemStr);
      // Check if item has expiry and if it's expired
      if (item.expiry) {
        const now = new Date();
        if (now.getTime() > item.expiry) {
          localStorage.removeItem(key);
          return null;
        }
        return item.value;
      }
      return item;
    } catch (error) {
      console.error('Error parsing storage item:', error);
      localStorage.removeItem(key);
      return null;
    }
  }
}
