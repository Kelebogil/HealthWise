import { Component, OnInit } from '@angular/core';
import { AvailableBookings } from 'src/app/models/available-bookings';
import { AvailableBookingsService } from 'src/app/services/available-bookings.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.page.html',
  styleUrls: ['./admin-dashboard.page.scss'],
})
export class AdminDashboardPage implements OnInit {

  availableBooking: any;
  currentDate: AvailableBookings = {};

  currentIndex = -1;

  constructor(private availableService: AvailableBookingsService) {}

  ngOnInit() {
    this.getAvailableBookings();
  }

  getAvailableBookings(): void {
    this.availableService.getAvailable()
    .subscribe((data) => {
      console.log("the data",data);
      this.availableBooking = data.usersList.data;
      console.log(this.availableBooking);
    });
  }

  setActive(availableBooking: AvailableBookings, index: number): void {
    this.currentDate = availableBooking;
    this.currentIndex = index;
  }
}
