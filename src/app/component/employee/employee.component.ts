import { ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroupDirective, NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ApiService } from 'src/app/services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs/internal/Observable';
import { SnackbarService } from 'src/app/services/snackbar.service';

//select error
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export interface Employees {
  id: number,
  lastName: string,
  firstName: string,
  email: string,
  imageURL: string,
  dateOfBirth: Date,
  placeOfBirth: string,
  phone: string,
  salary: number,
}

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  //disable button add employee
  disable: boolean = false;

  //grid
  gridColumns: any = 4;

  //spnner
  spinner = true;

  employees: any = [];

  toppings = this._formBuilder.group({
    pepperoni: false,
  });

  constructor(
    private api: ApiService,
    public dialog: MatDialog,
    private _formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    ) { }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  obs!: Observable<any>;
  dataSource!: MatTableDataSource<Employees>;

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogElementsDialog, {
      width: '970px',
      height: "1500px",
    });

    dialogRef.afterClosed().subscribe(result => {
      this.disable = !this.disable;
      this.getEmployeeData();
    });
  }

  //get employee data
  getEmployeeData() {
    this.api.getUser().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource<Employees>(res.data);
        this.employees = res.data;
        this.spinner = false;
       this.changeDetectorRef.detectChanges();
        this.dataSource.paginator = this.paginator;
        this.obs = this.dataSource.connect();
        console.log(this.employees.length);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  ngOnInit(): void {
    this.getEmployeeData();
  }

}

@Component({
  selector: 'dialog-elements-dialog',
  templateUrl: './dialog-elements-dialog.html',
})
export class DialogElementsDialog {
  //password
  hide = true;

  constructor(
    private api: ApiService,
    public dialogRef: MatDialogRef<DialogElementsDialog>,
    private snackBar: SnackbarService,
  ) { }


  //date
  date = new FormControl(new Date());
  // serializedDate = new FormControl(new Date().toISOString());

  //validate email
  email = new FormControl('', [Validators.required, Validators.email]);

  //employee data
  userCollection: any = {
    lastName!: "",
    firstName!: "",
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
    joinDate!: new Date(),
    emp_department_id!: "",
    user_role_id!: 1,
    emp_position_id!: "",

    //user account
    email!: "",
    password!: "",
    repeat_password!: "",

    //bank account
    bank_id!: "",
    bank_name!: "",
    bank_account_number!: "",

    //education
    school!: "",
    school_degree_id!: "",

    family!: "",

  }

  family: any = [
    {
      name!: "",
      phone!: "",
      family_relationship_id!: "",

    },
    {
      name!: "",
      phone!: "",
      family_relationship_id!: "",

    },
    {
      name!: "",
      phone!: "",
      family_relationship_id!: "",

    },
  ];

  departments: any = [];
  positions: any = [];

  //format date
  formatDate(date: any) {
    let formatted_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    return formatted_date;
  }

  selected = new FormControl('valid', [Validators.required, Validators.pattern('valid')]);
  selectFormControl = new FormControl('valid', [Validators.required, Validators.pattern('valid')]);
  nativeSelectFormControl = new FormControl('valid', [
    Validators.required,
    Validators.pattern('valid'),
  ]);
  matcher = new MyErrorStateMatcher();

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }



  //create user
  createUser() {
    this.userCollection.dateOfBith = this.formatDate(this.userCollection.dateOfBirth);
    this.userCollection.joinDate = this.formatDate(this.userCollection.joinDate);
    this.userCollection.family = this.family;

    this.api.createUser(this.userCollection).subscribe({
      next: (res) => {
        if (res.success) {
          this.dialogRef.close();
          this.snackBar.openSnackBarSuccess(res.message);
        }

      },
      error: (error) => {
        console.log(error);
        this.snackBar.openSnackBarFail(error.error.message);

      }
    })

    this.userCollection.dateOfBith = new Date();
    this.userCollection.joinDate = new Date();

  }

  ngOnInit(): void {
    this.api.getDepartment().subscribe({
      next: (res) => {
        if(res.success) {
          this.departments = res.data;
        }
      }
    });
    this.api.getPosition().subscribe({
      next: (res) => {
        if(res.success) {
          this.positions = res.data;
        }
      }
    });

    // this.openSnackBarSuccess("message: string");
  }


}
