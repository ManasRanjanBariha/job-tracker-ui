import { Injectable } from '@angular/core';
import { environment } from '../../env/environment';
import endPoints from '../../const/endpoints';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {

  constructor(private http: HttpClient) {
  }

  getDashboardStats() {
    return this.http.get(environment.apiUrl + endPoints.DASHBOARD);
  }
}

    