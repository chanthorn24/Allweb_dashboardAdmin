import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

export interface bankType {
  id: number;
  name: string;
}

let id: any;

@Component({
  selector: 'app-employee-bank',
  templateUrl: './employee-bank.component.html',
  styleUrls: ['./employee-bank.component.css']
})
export class EmployeeBankComponent implements OnInit {

  //table column
  displayedColumns: string[] = ['id', 'name', 'actions'];

  dataSource!: MatTableDataSource<bankType>;
  constructor(
    private api: ApiService,
    private dialog: MatDialog,
  ) { }

  @ViewChild(MatTable) table!: MatTable<bankType>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  //get bank type
  getBankTypes() {
    this.api.getAllBankType().subscribe({
      next: (res) => {
        if (res.success) {
          this.dataSource = new MatTableDataSource<bankType>(res.data);
          this.dataSource.paginator = this.paginator;
        }
      }
    })
  }

  ///create dialog
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogEmployeeBank, {
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getBankTypes();
    });
  }

  ///update dialog
  openUpdateDialog(data: any): void {
    const dialogRef = this.dialog.open(DialogUpdateBank, {
    });
    id = data;
    dialogRef.afterClosed().subscribe(result => {
      this.getBankTypes();
    });
  }

  //delete dialog
  openDeleteDialog(data: any): void {
    const dialogRef = this.dialog.open(DialogDeleteBank, {
    });
    id = data;
    dialogRef.afterClosed().subscribe(result => {
      this.getBankTypes();
    });
  }

  ngOnInit(): void {
    this.getBankTypes();
  }

}

//create diaglog
@Component({
  selector: 'dialog-employee-bank',
  templateUrl: 'dialog-employee-bank.html'
})
export class DialogEmployeeBank {

  //attendance type info
  public bankType: any = {
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
  createBankType() {
    if (this.bankType.name) {
      this.api.createBankType(this.bankType).subscribe({
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
  selector: 'dialog-edit-employee-bank',
  templateUrl: 'dialog-edit-employee-bank.html'
})
export class DialogUpdateBank implements OnInit {

  //attendance type info
  public bankType: any = {
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
  updateBankType() {
    if (this.bankType.name) {
      this.bankType.id = id;
      console.log(id);
      this.api.updateBankType(this.bankType).subscribe({
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
    this.api.getBankTypeById(id).subscribe({
      next: (res) => {
        if (res.success) {
          this.bankType = res.data[0];
        }
      }
    })
  }
}


//**Delete Dialog */
@Component({
  selector: 'dialog-delete-employee-bank',
  templateUrl: 'dialog-delete-employee-bank.html'
})
export class DialogDeleteBank {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private api: ApiService,
    public dialogRef: MatDialogRef<EmployeeBankComponent>,
    private snackBar: SnackbarService,
  ) { }

  //delete attendance type
  deleteBankType() {
    this.api.deleteBankType(id).subscribe({
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

