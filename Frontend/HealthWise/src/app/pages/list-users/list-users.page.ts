import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Users } from 'src/app/Model/user-model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.page.html',
  styleUrls: ['./list-users.page.scss'],
})
export class ListUsersPage implements OnInit {
  users: any;
  selectedUser?: Users;
  constructor(private authService: AuthService , private router: Router) { }

  ngOnInit() {
    this.retrieveUsers();
  }
  retrieveUsers() {
    this.authService.getAll().subscribe((res) => {
             this.users= res.usersList.data;
        console.log(this.users);
    })
}
onSelected(user:Users){
  this.selectedUser = user
  //set the appointment details to the local  storage
  localStorage.setItem('user',JSON.stringify(this.selectedUser))
  this.router.navigate(['/users-details/'])
 //  this.router.navigate(['/appointment-details/'+this.selectedAppointment.id])
}
}
