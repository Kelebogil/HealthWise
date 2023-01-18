import { Component, OnInit } from '@angular/core';
import { Admin } from 'src/app/Model/users';
import { LoginService } from 'src/app/services/login.service';
import { ActivatedRoute, Router} from '@angular/router';
import Swal from "sweetalert2";

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.page.html',
  styleUrls: ['./admin-login.page.scss'],
})
export class AdminLoginPage implements OnInit {

  pwdIcon = "eye-outline";
  showPwd = false;
  isloggedIn = false;

  admin: Admin = {
    doctor_reg_no: "",
    password: "",
  }

  loggedIn = false;

  constructor(private loginService: LoginService, private router: Router) { }

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

  loginAdmin():void {

    const data ={
      doctor_reg_no: this.admin.doctor_reg_no,
      password:this.admin.password

    };
    this.loginService.adminLog(data).subscribe({
      next:(res) =>{
        console.log(res);
        let credentials = res.addedUser.data[0].fn_admin_login;

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
          this.router.navigate(['/admin-profile']);

        }else{
          alert("Wrong credentials");
        }

      },
      error: ()=> console.error("Something went wrong")
    })
  }

}
