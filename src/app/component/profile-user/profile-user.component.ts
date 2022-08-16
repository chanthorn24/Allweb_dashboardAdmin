import { Component, OnInit } from '@angular/core';

export interface employeeProfile {
  name: string,
  phone: string,
  nationality: string,
  religion: string,
  is_married: boolean,
}
export interface employeeFamily {
  name: string,
  relationship: string,
  phone: string,
}
export interface employeeBank {
  bank: string,
  account_no: string,
  name: string,
}

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css']
})
export class ProfileUserComponent implements OnInit {

  constructor() { }

  employeeInformation: employeeProfile = {
    name: "Employee 1",
    phone: "012345678",
    nationality: "Khmer",
    religion: "Buddishm",
    is_married: true,
  };

  employeeFamily = [
    {
      name: "Ly",
      relationship: "Father",
      phone: "012345667"
    },
    {
      name: "Ly",
      relationship: "Father",
      phone: "012345667"
    },
    {
      name: "Ly",
      relationship: "Father",
      phone: "012345667"
    },
  ];

  employeeBank: employeeBank = {
    bank: "ABA",
    account_no: "023243534",
    name: "LCT"
  }



  ngOnInit(): void {
  }

}
