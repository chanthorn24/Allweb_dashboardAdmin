import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.css']
})
export class DashboardUserComponent implements OnInit {


  constructor() {}

  time!: any;
  checkTime!: any;
  checkName: string = "Check in";
  checkType: string = "in";

  ngOnInit(): void {
    setInterval(() => {
      this.time = new Date(); //set time variable with current date
    }, 1000); // set it every one seconds
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
