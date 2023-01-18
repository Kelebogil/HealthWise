import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment } from '../Model/appointments-model';
import { HttpClient } from '@angular/common/http';
const baseUrl = "https://ionic-project-api.herokuapp.com/appointments";
@Injectable({   providedIn: 'root' })
export class AppointmentsService {
  constructor(private http: HttpClient) { }
  getAll(): Observable<any> {
    return this.http.get(baseUrl);
  }

    get(id:any): Observable<any>{
      return this.http.get(`${baseUrl}/${id}`);
    }
}
