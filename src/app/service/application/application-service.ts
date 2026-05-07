import { Injectable } from '@angular/core';
import { environment } from '../../env/environment';
import endPoints from '../../const/endpoints';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  
  constructor(private http: HttpClient) {
  }
  getAllApplications() {
    return this.http.get(environment.apiUrl + endPoints.ALLAPPLICATIONS);
  }

  createApplication(applicationData: any) {
    return this.http.post(environment.apiUrl + endPoints.CREATEAPPLICATION, applicationData);
  }
}
