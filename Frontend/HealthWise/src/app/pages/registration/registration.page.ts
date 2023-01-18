import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from 'src/app/Model/user-model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  user: Users = {
    email_address: "",
    first_name: "",
    last_name: "",
    password: ""
  }
  submitted = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }
  newUser(): void {
    this.submitted = false;
    this.user = {
      email_address: "",
      first_name: "",
      last_name: "",
      password: "",

    }
  }
  saveUser(): void {

    const data = {
      email_address: this.user.email_address.replace(/^\s+|\s+$/gm,''),
      first_name: this.user.first_name,
      last_name: this.user.last_name,
      password: this.user.password,

    };
    const data2 = {
      email_address: this.user.email_address,
      first_name: this.user.first_name,
      last_name: this.user.last_name,
      password: this.user.password,

    };

    if (!this.user.email_address || !this.user.first_name || !this.user.last_name || !this.user.password) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill in all fields!',
      })
    } else if (!(this.user.email_address.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please enter a valid email address!',
      })
    } else if (this.user.password.length < 8) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Password must have atleast 8 characters!',
      })
    } else {

      this.authService.emailCheck(data.email_address).subscribe({
        next: (msg) => {
          const emailExists = msg.emailExists.data[0].fn_email_address_exists;

          if (emailExists) {
            Swal.fire({
              icon: 'warning',
              title: 'Oops...',
              text: 'An account registered with this email address is already found!',
            })
          } else {
            this.authService.oldEmail(data2).subscribe({
              next: (response) => {
                const returningUser = response.returningUser.data[0].fn_register_with_old_email;
                if (returningUser) {
                  Swal.fire(
                    'Welcome back!',
                    'You have successfully registered!',
                    'success'
                  )
                } else {
                  this.authService.create(data).subscribe({
                    next: (res) => {
                      this.submitted = true;
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
                        title: 'Registered successfully'
                      })
                      this.router.navigate(['/login']);
                    }
                  })
                }
              }
            })
          }
        }
      })
    }
  }
}
