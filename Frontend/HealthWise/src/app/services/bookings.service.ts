import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


import { User } from '../models/user';

const base_url='https://ionic-project-api.herokuapp.com/appointments/bookAppointment';
const byID = 'https://ionic-project-api.herokuapp.com/appointments/getAppointmentt';

@Injectable({
  providedIn: 'root'
})


export class BookingsService {

  constructor( private http:HttpClient) { }

  // getAllUsers(email:any):Observable<any>
  // {
  //     return this.http.get(`${base_url}/users ${email}`)
  // }
  createAppointment(data: any): Observable<any> {
    return this.http.post(base_url, data);
  }


  getById(id: any): Observable<any> {
    return this.http.get(`${byID}/${id}`);
  }


}
