import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const checkEmail = 'https://ionic-project-api.herokuapp.com/users/checkEmail';
const reRegister = 'https://ionic-project-api.herokuapp.com/users/reRegister';
const baseUrl = 'https://ionic-project-api.herokuapp.com/users/register';
const adminUrl = "https://ionic-project-api.herokuapp.com/admin/getAdmin";
const users = "https://ionic-project-api.herokuapp.com/admin/allUsers";
const base_url = 'https://ionic-project-api.herokuapp.com/users/update';
const deleteUrl = "https://ionic-project-api.herokuapp.com/admin/cancel";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {

  }

  emailCheck(email: any): Observable<any> {
    return this.http.get(`${checkEmail}/${email}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  oldEmail(data: any): Observable<any> {
    return this.http.patch(reRegister, data);
  }

  updateUser(data: any): Observable<any> {
    return this.http.patch(base_url, data);
  }

  deleteUser(data: any): Observable<any> {
    return this.http.patch(deleteUrl, data);
  }

  getAdmin(): Observable<any> {
    return this.http.get(adminUrl);
  }

  getAll(): Observable<any> {
    return this.http.get(users);
  }

}
