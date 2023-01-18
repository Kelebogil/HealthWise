import { Component, OnInit } from '@angular/core';
import { AppointmentsService } from '../services/appointments.service';
import {Appointment} from 'src/app/Model/appointments-model'
@Component({
  selector: 'app-view-appointment',
  templateUrl: './view-appointment.component.html',
  styleUrls: ['./view-appointment.component.scss'],
})
export class ViewAppointmentComponent implements OnInit {
  appointment?: Appointment[];
  currentApp:   Appointment={};

  currentIndex = -1;
  email_address = '';
  constructor(private appointmentService: AppointmentsService) { }

  ngOnInit() {}

  retrieveAppointment(): void {
   
    this.appointmentService.getAll()
    .subscribe({
      next: (data) => {
        this.appointment = data;
        console.log(data);
      },

      error: (e) => console.error(e)

    });
  }
}