import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

export interface familyType {
  id: number;
  name: string;
}

let id: any;
@Component({
  selector: 'app-employee-family',
  templateUrl: './employee-family.component.html',
  styleUrls: ['./employee-family.component.css']
})
export class EmployeeFamilyComponent implements OnInit {

    //table column
  displayedColumns: string[] = ['id', 'name', 'actions'];

  dataSource!: MatTableDataSource<familyType>;
  constructor(
    private api: ApiService,
    private dialog: MatDialog,
  ) { }

  @ViewChild(MatTable) table!: MatTable<familyType>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  //get family type
  getfamilyTypes() {
    this.api.getAllFamily().subscribe({
      next: (res) => {
        if (res.success) {
          this.dataSource = new MatTableDataSource<familyType>(res.data);
          this.dataSource.paginator = this.paginator;
        }
      }
    })
  }

  ///create dialog
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogEmployeefamily, {
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getfamilyTypes();
    });
  }

  ///update dialog
  openUpdateDialog(data: any): void {
    const dialogRef = this.dialog.open(DialogUpdatefamily, {
    });
    id = data;
    dialogRef.afterClosed().subscribe(result => {
      this.getfamilyTypes();
    });
  }

  //delete dialog
  openDeleteDialog(data: any): void {
    const dialogRef = this.dialog.open(DialogDeletefamily, {
    });
    id = data;
    dialogRef.afterClosed().subscribe(result => {
      this.getfamilyTypes();
    });
  }

  ngOnInit(): void {
    this.getfamilyTypes();
  }

}

//create diaglog
@Component({
  selector: 'dialog-employee-family',
  templateUrl: 'dialog-employee-family.html'
})
export class DialogEmployeefamily {

  //attendance type info
  public familyType: any = {
    name: "",
  }

  name = new FormControl('', [Validators.required]);

  constructor(
    private api: ApiService,
    private snackBar: SnackbarService,
    private dialogRef: DialogRef
  ) { }


getErrorMessage() {
    if (this.name.hasError('required')) {
      return 'You must enter a value';
    }
    return '';
  }

  //create attendance
  createFamilyType() {
    if (this.familyType.name) {
      this.api.createFamily(this.familyType).subscribe({
        next: (res) => {
          console.log(res);

          if (res) {
            //snackbar
            this.snackBar.openSnackBarSuccess("Create successfully!");
            //close the dialog
            this.dialogRef.close();
          }
        },
        error: (err) => {
          this.snackBar.openSnackBarFail(err.message);
        }
      })
    }
  }
}

//update diaglog
@Component({
  selector: 'dialog-edit-employee-family',
  templateUrl: 'dialog-edit-employee-family.html'
})
export class DialogUpdatefamily implements OnInit {

  //attendance type info
  public familyType: any = {
    name: "",
    id: ""
  }

  name = new FormControl('', [Validators.required]);

  constructor(
    private api: ApiService,
    private snackBar: SnackbarService,
    private dialogRef: DialogRef
  ) { }


getErrorMessage() {
    if (this.name.hasError('required')) {
      return 'You must enter a value';
    }
    return '';
  }

  //create attendance
  updateFamilyType() {
    if (this.familyType.name) {
      this.familyType.id = id;
      console.log(id);
      this.api.updateFamily(this.familyType).subscribe({
        next: (res) => {
          if (res.success) {
            //snackbar
            this.snackBar.openSnackBarSuccess("Update successfully!");
            //close the dialog
            this.dialogRef.close();
          }
        },
        error: (err) => {
          this.snackBar.openSnackBarFail(err.message);
        }
      })
    }
  }

  ngOnInit(): void {
    this.api.getFamilyById(id).subscribe({
      next: (res) => {
        if (res.success) {
          this.familyType = res.data[0];
        }
      }
    })
  }
}


//**Delete Dialog */
@Component({
  selector: 'dialog-delete-employee-family',
  templateUrl: 'dialog-delete-employee-family.html'
})
export class DialogDeletefamily {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private api: ApiService,
    public dialogRef: MatDialogRef<EmployeeFamilyComponent>,
    private snackBar: SnackbarService,
  ) { }

  //delete attendance type
  deleteFamilyType() {
    this.api.deleteFamily(id).subscribe({
      next: (res) => {
        if (res.success) {
          //open snackbar
          this.snackBar.openSnackBarSuccess('Deleted Successfully');
          this.dialogRef.close();
        }
      },
      error: (err) => {
        this.snackBar.openSnackBarFail(err.message);
      }
    })
  }
}


