import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

export interface roleType {
  id: number;
  name: string;
}

let id: any;

@Component({
  selector: 'app-employee-role',
  templateUrl: './employee-role.component.html',
  styleUrls: ['./employee-role.component.css']
})
export class EmployeeRoleComponent implements OnInit {

    //table column
  displayedColumns: string[] = ['id', 'name', 'actions'];

  dataSource!: MatTableDataSource<roleType>;
  constructor(
    private api: ApiService,
    private dialog: MatDialog,
  ) { }

  @ViewChild(MatTable) table!: MatTable<roleType>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  //get role type
  getroleTypes() {
    this.api.getAllRole().subscribe({
      next: (res) => {
        if (res.success) {
          this.dataSource = new MatTableDataSource<roleType>(res.data);
          this.dataSource.paginator = this.paginator;
        }
      }
    })
  }

  ///create dialog
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogEmployeerole, {
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getroleTypes();
    });
  }

  ///update dialog
  openUpdateDialog(data: any): void {
    const dialogRef = this.dialog.open(DialogUpdaterole, {
    });
    id = data;
    dialogRef.afterClosed().subscribe(result => {
      this.getroleTypes();
    });
  }

  //delete dialog
  openDeleteDialog(data: any): void {
    const dialogRef = this.dialog.open(DialogDeleterole, {
    });
    id = data;
    dialogRef.afterClosed().subscribe(result => {
      this.getroleTypes();
    });
  }

  ngOnInit(): void {
    this.getroleTypes();
  }

}

//create diaglog
@Component({
  selector: 'dialog-employee-role',
  templateUrl: 'dialog-employee-role.html'
})
export class DialogEmployeerole {

  //attendance type info
  public roleType: any = {
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
  createRoleType() {
    if (this.roleType.name) {
      this.api.createRole(this.roleType).subscribe({
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
  selector: 'dialog-edit-employee-role',
  templateUrl: 'dialog-edit-employee-role.html'
})
export class DialogUpdaterole implements OnInit {

  //attendance type info
  public roleType: any = {
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
  updateRoleType() {
    if (this.roleType.name) {
      this.roleType.id = id;
      console.log(id);
      this.api.updateRole(this.roleType).subscribe({
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
    this.api.getRoleById(id).subscribe({
      next: (res) => {
        if (res.success) {
          this.roleType = res.data[0];
        }
      }
    })
  }
}


//**Delete Dialog */
@Component({
  selector: 'dialog-delete-employee-role',
  templateUrl: 'dialog-delete-employee-role.html'
})
export class DialogDeleterole {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private api: ApiService,
    public dialogRef: MatDialogRef<EmployeeRoleComponent>,
    private snackBar: SnackbarService,
  ) { }

  //delete attendance type
  deleteRoleType() {
    this.api.deleteRole(id).subscribe({
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

