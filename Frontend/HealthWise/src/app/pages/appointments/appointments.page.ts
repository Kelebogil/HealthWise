import { Component, OnInit } from '@angular/core';
import { AppointmentsService } from '../../services/appointments.service'
import {Appointment} from 'src/app/Model/appointments-model'
import { Router } from '@angular/router';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.page.html',
  styleUrls: ['./appointments.page.scss'],
})
export class AppointmentsPage implements OnInit {
  selectedAppointment?: Appointment;
  appointment: any;
  currentApp:   Appointment = {};
  currentIndex = -1;
  email_address = '';
  constructor(private appointmentService: AppointmentsService, private router: Router) { }

  ngOnInit() {

     this.retrieveAppointment();
  }
  retrieveAppointment() {
    this.appointmentService.getAll().subscribe((res) => {
             this.appointment= res.appointments.data;
        console.log(res.appointments.data);
    })
}
  // setActiveAppointment(appointment:Appointment, index: number): void {
  //   this.currentApp = appointment;
  //   this.currentIndex = index;
  // }

   onSelected(appointment:Appointment){
    this.selectedAppointment = appointment
    //set the appointment details to the local  storage
    localStorage.setItem('appointment',JSON.stringify(this.selectedAppointment))
    this.router.navigate(['/appointment-details/'])
   //  this.router.navigate(['/appointment-details/'+this.selectedAppointment.id])
  }
  }
