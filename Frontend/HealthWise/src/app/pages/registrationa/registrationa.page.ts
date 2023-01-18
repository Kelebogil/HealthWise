import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from 'src/app/Model/user-model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registrationa',
  templateUrl: './registrationa.page.html',
  styleUrls: ['./registrationa.page.scss'],
})
export class RegistrationaPage implements OnInit {
  user:Users ={
    email_address:"",
    first_name:"",
    last_name:"",
    password:""
  }
  submitted =false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }
newUser():void{
  this.submitted =false;
  this.user ={
    email_address: "",
    first_name:"",
    last_name:"",
    password:"",

  }
}
saveUser():void{

  const data ={
    email_address: this.user.email_address,
    first_name: this.user.first_name,
    last_name:this.user.last_name,
    password:this.user.password,

  };
  this.authService.create(data).subscribe({
    next:(res) =>{
      console.log(res);
      this.submitted = true;
      alert("User Registered successfully");
      this.router.navigate(['/admin-profile']);
    },
    error: ()=> console.error("Something went wrong")

  })
}
}
