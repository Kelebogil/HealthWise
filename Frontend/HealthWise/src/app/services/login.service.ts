import { Injectable } from '@angular/core';
import { HttpClient }from '@angular/common/http';
import { Observable } from 'rxjs';

const loginUrl = "https://ionic-project-api.herokuapp.com/users/login";
const userUrl = "https://ionic-project-api.herokuapp.com/users/adminGetUser";
const adminLogin = "https://ionic-project-api.herokuapp.com/admin/adminLogin";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  create(data: any): Observable<any> {
    return this.http.post(loginUrl, data);
  }

  adminLog(data: any): Observable<any> {
    return this.http.post(adminLogin, data);
  }

 getUser(email: string, data: any): Observable<any> {
   return this.http.get(userUrl, data);
 }

}