import { Component, OnInit } from '@angular/core';
import {Validators,FormBuilder,FormGroup,FormControl } from '@angular/forms';
//import { ForgotPasswordPage } from '../forgot-password/forgot-password.page';
import { UpdateInfor } from 'src/app/models/user';
import {AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
//import { Updates } from 'src/app/Model/users';
@Component({
  selector: 'app-updating',
  templateUrl: './updating.page.html',
  styleUrls: ['./updating.page.scss'],
})
export class UpdatingPage implements OnInit {

  updatingform: FormGroup;
  updateInfor:UpdateInfor={

    first_name: "",
    last_name: "",
    email:""


 };


  get firstName() {
    return this.updatingform.get('first_name');
  }

  get lastName() {
    return this.updatingform.get('last_name');
  }
  get userEmail() {
    return this.updatingform.get('email');
  };

  onSubmit(){
    let formData = this.updatingform.value
  }



  constructor( private updatingService:AuthService) { }

  ngOnInit() {
    this.updatingform= new FormGroup({

      first_name :new FormControl('',[
        Validators.required
      ]),

      last_name : new FormControl('',[

        Validators.required
      ]),
       email_address : new FormControl('',
       [ Validators.required])
    })

  }


    updateUser():void {

      const data ={
        name: this.updatingform.value.first_name,
        surname:this.updatingform.value.last_name,
        email: this.updatingform.value.email_address

      };
      this.updatingService.updateUser(data).subscribe({
        next:(res) =>{
          console.log(res);

        },
        error: ()=> console.error("Something went wrong")
      })
    }
}
