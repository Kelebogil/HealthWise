import { Component, Input, OnInit } from '@angular/core';
import { AppointmentsService } from '../../services/appointments.service'
import { Appointment } from 'src/app/Model/appointments-model';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-appointment-details',
  templateUrl: './appointment-details.page.html',
  styleUrls: ['./appointment-details.page.scss'],
})
export class AppointmentDetailsPage implements OnInit {

   @Input() appointment?: Appointment
  
  approved = false;
  result="No"
  userData:any ;
  user:any;
 
  constructor(
    private appointmentService: AppointmentsService,
    private route: ActivatedRoute,
    private router: Router) {}


  ngOnInit() {


    this.userData = localStorage.getItem('appointment')
    this.user = JSON.parse(this.userData);
    console.log("This is the ap Details : ", this.user);

  }
  approveAppointment(){
   this.approved = !this.approved
   if(!this.approved){
    this.result ="No"
   }
   else{
    this.result ="Yes"
   }
   
  }
}
