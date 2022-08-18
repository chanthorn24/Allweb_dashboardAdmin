import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.css']
})
export class DashboardUserComponent implements OnInit {


  constructor(private authService:  AuthService, private router: Router) {}

  time!: any;
  checkTime!: any;
  checkName: string = "Check in";
  checkType: string = "in";

  ngOnInit(): void {
    if (this.authService.isAdmin()) {
      this.router.navigateByUrl("/");
    }
    setInterval(() => {
      this.time = new Date(); //set time variable with current date
    }, 1000); // set it every one seconds
  }

  reloadCurrentRoute() {
    console.log("Work");

    const currentRoute = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRoute]);
    })
  }

  checkIn() {
    this.checkName = "Check in";
    this.checkType = "out";
    this.checkTime = new Date();
  }
  checkOut() {
    this.checkName = "Check out";
    this.checkType = "in";
    this.checkTime = new Date();
  }

}
