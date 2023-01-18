import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from "sweetalert2";

@Component({
  selector: 'app-users-details',
  templateUrl: './users-details.page.html',
  styleUrls: ['./users-details.page.scss'],
})
export class UsersDetailsPage implements OnInit {
  userData:any =[]
  user:any = []
  constructor(private authService: AuthService , private router: Router) { }

  ngOnInit() {
   this.userData = localStorage.getItem('user')
   this.user = JSON.parse(this.userData);
   console.log("This is the ap Details : ", this.user);


  }



  deleteUsers(): void {

    this.userData = localStorage.getItem('user')
    this.user = JSON.parse(this.userData)

    const data = {
      id: this.user.user_id,
      message: "front test"
    };

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.authService.deleteUser(data).subscribe({
          next:(res) =>{
            console.log(res);
            let deleted = res.user.data[0].fn_cancel_account;
            if(deleted){
              Swal.fire(
                'Deleted!',
                'The Account is deactivated',
                'success'
              )
              this.router.navigate(['/list-users']);
            }else{
              Swal.fire('Changes are not saved', '', 'error')
            }
          },
          error: ()=> console.error("Something went wrong")
        })
      }
    })
  }
}