import { Injectable } from '@angular/core';
import { AvailableBookings } from '../models/available-bookings';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const baseUrl = "https://ionic-project-api.herokuapp.com/admin/availableSlots";

@Injectable({
  providedIn: 'root'
})

export class AvailableBookingsService {

  constructor(private http: HttpClient) { }

  getAvailable(): Observable<any> {
    return this.http.get(baseUrl);
  }

}
