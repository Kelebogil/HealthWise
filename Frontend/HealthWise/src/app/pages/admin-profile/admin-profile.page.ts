import { Component, OnInit } from '@angular/core';
  import { AuthService } from 'src/app/services/auth.service';
  @Component({
    selector: 'app-admin-profile',
    templateUrl: './admin-profile.page.html',
    styleUrls: ['./admin-profile.page.scss'],
  })
  export class AdminProfilePage implements OnInit {
    admin: any
    constructor( private authService: AuthService) { }

    ngOnInit() {
      this.retrieveAdmin()
    }
    retrieveAdmin() {
      this.authService.getAdmin().subscribe((res) => {
               this.admin= res.user.data;
          console.log(this.admin);
      })

  }
  }
