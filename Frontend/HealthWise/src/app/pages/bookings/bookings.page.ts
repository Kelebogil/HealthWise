import { formatDate } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import {Validators,FormBuilder,FormGroup,FormControl } from '@angular/forms';
import { BookingsService } from 'src/app/services/bookings.service';
import { User } from 'src/app/models/user';
import { Appointment } from 'src/app/models/appointment';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {
  date: any;
  user:User ={
    client_full_names:"",
  client_phone_no:"",
  description:"",
  appointment_date:new Date

  }

  @Input() currentAppointment: Appointment = {
    id: 0,
    booking_date: '',
    booking_time: ''
  }

 bookingform:FormGroup;

  constructor(private bookingsService: BookingsService){

  }


  submitted =false;
  newAppointment():void{
 console.log(this.bookingform.value);

    this.submitted =false;
    this.user ={
      client_full_names:"",
      client_phone_no:"",
      description:"",
      appointment_date:new Date
    }
    };

    saveNewUser(): void{
      console.log(this.bookingform.value)
     const data={

      client_full_names:this.user.client_full_names,
      client_phone_no:this.user.client_phone_no,
      description:this.user.description,
      appointment_date:this.user.appointment_date
    };

    this.bookingsService.createAppointment(data).subscribe({
      next:(res) =>{
        console.log(res);
        this.submitted = true
        alert("you have successfully booked your appointment")
        window.location.reload();
      },
      error: (e)=> console.error(e)
    })
  }



  ngOnInit() {
    let now = new Date();


   this.date =  new Date().toJSON().split('T')[0];
    console.log("dateFormat :",this.date);

    this.bookingform = new FormGroup({
      names : new FormControl('',[
        Validators.required
      ]),
       number: new FormControl('',[
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(5)
       ]),

       dates : new FormControl('',[
        Validators.required
       ]),

       problem: new FormControl('',[
        Validators.required
      ])

    })

  }
   onSubmit(form:FormGroup){
    console.log(this.bookingform.value);

    this.bookingsService.createAppointment(this.bookingform.value).subscribe((data)=>{
      localStorage.setItem('token',JSON.stringify(data.token));
      const userData ={

        user_id:data.user.user_id,
        fullnamaes:data.user.fullnames,
        dates:data.user.dates,
        number:data.user.number,
        problem:data.user.problem
      };
      localStorage.setItem('user',JSON.stringify(userData));
      localStorage.setItem('refreshIndex','0')
    })

   }

   getOneAppointment(id: any){
     this.bookingsService.getById(id).subscribe((data) => {
       this.currentAppointment = data;

       data = {
         booking_date: this.currentAppointment.booking_date,
         booking_time: this.currentAppointment.booking_time
       }
     });
   }

  //  onSubmit(form:FormGroup){
  //   console.log(this.bookingform.value);

  //   this.bookingsService.createUser(this.bookingform.value).subscribe((data)=>{
  //     localStorage.setItem('token',JSON.stringify(data.token));
  //     const userData ={

  //       //user_id:data.user.user_id,
  //       client_full_names:data.user.client_full_names,
  //       client_phone_no:data.user.client_phone_no,
  //       description:data.user.description,
  //       appointment_date:data.user.appointment_date
  //     };
  //     localStorage.setItem('user',JSON.stringify(userData));
  //     localStorage.setItem('refreshIndex','0')
  //   })




}

