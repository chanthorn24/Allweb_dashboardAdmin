import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';

export interface DialogData {
  animal: string,
  name: string,
}

export interface EmployeeData {
  email: string,
  lastName: string,
  firstName: string,
  dateOfBirth: string,
  placeOfBirth: string,
  phone: string,
  salary: number,
  imageURL: string,
  gender: string,
  nationality: string,
  religion: string,
  address: string,
  is_married: boolean,
  joinDate: string,
  em_department_id: number,
  user_role_id: number,
  password: string,
  repeat_password: string
}

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  //disable button add employee
  disable: boolean = false;

  employees: any = [
    {
      "id" : "1",
      "imageURL" : "https://th.bing.com/th/id/OIP.9nyTpzPgpvxBs2vYCYxytgHaG0?pid=ImgDet&rs=1",
      "firstName" : "Employee",
      "lastName" : "1",
      "userRole" : "Web Developer"
    },
    {
      "id" : "2",
      "imageURL" : "https://th.bing.com/th/id/OIP.9nyTpzPgpvxBs2vYCYxytgHaG0?pid=ImgDet&rs=1",
      "firstName" : "Employee",
      "lastName" : "1",
      "userRole" : "Web Developer"
    },
    {
      "id" : "3",
      "imageURL" : "https://th.bing.com/th/id/OIP.9nyTpzPgpvxBs2vYCYxytgHaG0?pid=ImgDet&rs=1",
      "firstName" : "Employee",
      "lastName" : "1",
      "userRole" : "Web Developer"
    },
    {
      "id" : "4",
      "imageURL" : "https://th.bing.com/th/id/OIP.9nyTpzPgpvxBs2vYCYxytgHaG0?pid=ImgDet&rs=1",
      "firstName" : "Employee",
      "lastName" : "1",
      "userRole" : "Web Developer"
    },
    {
      "id" : "5",
      "imageURL" : "https://th.bing.com/th/id/OIP.9nyTpzPgpvxBs2vYCYxytgHaG0?pid=ImgDet&rs=1",
      "firstName" : "Employee",
      "lastName" : "1",
      "userRole" : "Web Developer"
    },
    {
      "id" : "6",
      "imageURL" : "https://th.bing.com/th/id/OIP.9nyTpzPgpvxBs2vYCYxytgHaG0?pid=ImgDet&rs=1",
      "firstName" : "Employee",
      "lastName" : "1",
      "userRole" : "Web Developer"
    },
    {
      "id" : "7",
      "imageURL" : "https://th.bing.com/th/id/OIP.9nyTpzPgpvxBs2vYCYxytgHaG0?pid=ImgDet&rs=1",
      "firstName" : "Employee",
      "lastName" : "1",
      "userRole" : "Web Developer"
    },
    {
      "id" : "1",
      "imageURL" : "https://th.bing.com/th/id/OIP.9nyTpzPgpvxBs2vYCYxytgHaG0?pid=ImgDet&rs=1",
      "firstName" : "Employee",
      "lastName" : "1",
      "userRole" : "Web Developer"
    },
    {
      "id" : "1",
      "imageURL" : "https://th.bing.com/th/id/OIP.9nyTpzPgpvxBs2vYCYxytgHaG0?pid=ImgDet&rs=1",
      "firstName" : "Employee",
      "lastName" : "1",
      "userRole" : "Web Developer"
    },
    {
      "id" : "1",
      "imageURL" : "https://th.bing.com/th/id/OIP.9nyTpzPgpvxBs2vYCYxytgHaG0?pid=ImgDet&rs=1",
      "firstName" : "Employee",
      "lastName" : "1",
      "userRole" : "Web Developer"
    },
    {
      "id" : "1",
      "imageURL" : "https://th.bing.com/th/id/OIP.9nyTpzPgpvxBs2vYCYxytgHaG0?pid=ImgDet&rs=1",
      "firstName" : "Employee",
      "lastName" : "1",
      "userRole" : "Web Developer"
    },
    {
      "id" : "1",
      "imageURL" : "https://th.bing.com/th/id/OIP.9nyTpzPgpvxBs2vYCYxytgHaG0?pid=ImgDet&rs=1",
      "firstName" : "Employee",
      "lastName" : "1",
      "userRole" : "Web Developer"
    },
    {
      "id" : "1",
      "imageURL" : "https://th.bing.com/th/id/OIP.9nyTpzPgpvxBs2vYCYxytgHaG0?pid=ImgDet&rs=1",
      "firstName" : "Employee",
      "lastName" : "1",
      "userRole" : "Web Developer"
    },
    {
      "id" : "1",
      "imageURL" : "https://th.bing.com/th/id/OIP.9nyTpzPgpvxBs2vYCYxytgHaG0?pid=ImgDet&rs=1",
      "firstName" : "Employee",
      "lastName" : "1",
      "userRole" : "Web Developer"
    },
    {
      "id" : "1",
      "imageURL" : "https://th.bing.com/th/id/OIP.9nyTpzPgpvxBs2vYCYxytgHaG0?pid=ImgDet&rs=1",
      "firstName" : "Employee",
      "lastName" : "1",
      "userRole" : "Web Developer"
    },
    {
      "id" : "1",
      "imageURL" : "https://th.bing.com/th/id/OIP.9nyTpzPgpvxBs2vYCYxytgHaG0?pid=ImgDet&rs=1",
      "firstName" : "Employee",
      "lastName" : "1",
      "userRole" : "Web Developer"
    },
    {
      "id" : "1",
      "imageURL" : "https://th.bing.com/th/id/OIP.9nyTpzPgpvxBs2vYCYxytgHaG0?pid=ImgDet&rs=1",
      "firstName" : "Employee",
      "lastName" : "1",
      "userRole" : "Web Developer"
    },
    {
      "id" : "1",
      "imageURL" : "https://th.bing.com/th/id/OIP.9nyTpzPgpvxBs2vYCYxytgHaG0?pid=ImgDet&rs=1",
      "firstName" : "Employee",
      "lastName" : "1",
      "userRole" : "Web Developer"
    },
    {
      "id" : "1",
      "imageURL" : "https://th.bing.com/th/id/OIP.9nyTpzPgpvxBs2vYCYxytgHaG0?pid=ImgDet&rs=1",
      "firstName" : "Employee",
      "lastName" : "1",
      "userRole" : "Web Developer"
    },
    {
      "id" : "1",
      "imageURL" : "https://th.bing.com/th/id/OIP.9nyTpzPgpvxBs2vYCYxytgHaG0?pid=ImgDet&rs=1",
      "firstName" : "Employee",
      "lastName" : "1",
      "userRole" : "Web Developer"
    },
  ];

  // userCollection: any = {
  //   email!: "",
  //   lastName!: "",
  //   firstName!: "",
  //   dateOfBirth!: "",
  //   placeOfBirth!: "",
  //   phone!: "",
  //   salary!: "",
  //   imageURL!: "",
  //   gender!: "",
  //   nationality!: "",
  //   religion!: "",
  //   address!: "",
  //   is_married!: "",
  //   joinDate!: "",
  //   em_department_id!: "",
  //   user_role_id!: "",
  //   password!: "",
  //   repeat_password!: ""
  // }

  toppings = this._formBuilder.group({
    pepperoni: false,
  });

  constructor(public dialog: MatDialog, private _formBuilder: FormBuilder) { }

  animal!: string;
  name!: string;

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogElementsDialog, {
      width: '970px',
      height: "1500px",

      data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.disable = !this.disable;
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  ngOnInit(): void {
  }

}

@Component({
  selector: 'dialog-elements-dialog',
  templateUrl: './dialog-elements-dialog.html',
})
export class DialogElementsDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogElementsDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  //date
  date = new FormControl(new Date());
  // serializedDate = new FormControl(new Date().toISOString());

  //validate email
  email = new FormControl('', [Validators.required, Validators.email]);
  userCollection: any = {
    email!: "",
    lastName!: "",
    firstName!: "",
    userName!: "",
    dateOfBirth!: new Date(),
    placeOfBirth!: "",
    phone!: "",
    salary!: "",
    imageURL!: "",
    gender!: "",
    nationality!: "",
    religion!: "",
    address!: "",
    is_married!: "",
    joinDate!: "",
    em_department_id!: "",
    user_role_id!: "",
    password!: "",
    repeat_password!: ""
  }

  formatDate(date: any) {
    let formatted_date = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
    return formatted_date;
}


  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }


}
