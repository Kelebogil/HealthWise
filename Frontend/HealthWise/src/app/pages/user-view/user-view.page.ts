import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/Model/user-model';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.page.html',
  styleUrls: ['./user-view.page.scss'],
})
export class UserViewPage implements OnInit {

  constructor( private loginService: LoginService) { }

  user: Users = {
    email_address: "",
    first_name: "",
    last_name: "",
    password: "",
  }

  ngOnInit() {
  }



  getUserByEmail(){
    const data = {
      first_name: this.user.first_name,
      last_name:this.user.last_name,
      email: this.user.email_address,
      password: this.user.password

    }
    this.loginService.getUser(this.user.email_address, data).subscribe({
      next: (res) =>{
        if(data.email === this.user.email_address){
          console.log(res);
        }
        else{
          throw Error
        }


      }
    })

  }

}
