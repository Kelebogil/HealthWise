//import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/Model/users';
import { LoginService } from 'src/app/services/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from "sweetalert2";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  pwdIcon = "eye-outline";
  showPwd = false;
  isloggedIn = false;

  user: Users = {
    email_address: "",
    password: "",
  }

  loggedIn = false;


  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit() {
  }

  togglePwd() {
    this.showPwd = !this.showPwd;
    // this.pwdIcon = this.showPwd ? "eye-off-outline" : "eye-outline";
    if(!this.showPwd){
      this.pwdIcon = "eye-off-outline";

    }
    else{
      this.pwdIcon = "eye-outline";
    }

  }



  loginUser():void {

    const data ={
      email_address: this.user.email_address,
      password:this.user.password

    };
    this.loginService.create(data).subscribe({
      next:(res) =>{
        console.log(res);
        let credentials = res.addedUser.data[0].fn_user_login;

        if(credentials){
          this.isloggedIn = true;
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })

          Toast.fire({
            icon: 'success',
            title: 'Signed in successfully'
          })
          this.router.navigate(['/admin-dashboard']);

        }else{
          alert("Wrong credentials");
        }

      },
      error: ()=> console.error("Something went wrong")
    })
  }

}
