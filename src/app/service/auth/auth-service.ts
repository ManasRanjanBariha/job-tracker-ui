import { Injectable } from '@angular/core';
import { environment } from '../../env/environment';
import endPoints from '../../const/endpoints';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  
  constructor() {
  }

  async login(email: string, password: string) {
    const response = await fetch(environment.apiUrl + endPoints.LOGIN, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  }

  async register(fname: string, lname: string, email: string, pass: string) {
    const response = await fetch(environment.apiUrl + endPoints.REGISTER, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fname, lname, email, pass }),
    });
    return response.json();
  }

  async refreshToken(refreshToken: string) {
    const response = await fetch(environment.apiUrl + endPoints.REFRESH, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });
    return response.json();
  }
}
