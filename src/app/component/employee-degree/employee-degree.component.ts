import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

export interface degreeType {
  id: number;
  name: string;
}

let id: any;

@Component({
  selector: 'app-employee-degree',
  templateUrl: './employee-degree.component.html',
  styleUrls: ['./employee-degree.component.css']
})
export class EmployeeDegreeComponent implements OnInit {

    //table column
  displayedColumns: string[] = ['id', 'name', 'actions'];

  dataSource!: MatTableDataSource<degreeType>;
  constructor(
    private api: ApiService,
    private dialog: MatDialog,
  ) { }

  @ViewChild(MatTable) table!: MatTable<degreeType>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  //get degree type
  getdegreeTypes() {
    this.api.getAllDegree().subscribe({
      next: (res) => {
        if (res.success) {
          this.dataSource = new MatTableDataSource<degreeType>(res.data);
          this.dataSource.paginator = this.paginator;
        }
      }
    })
  }

  ///create dialog
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogEmployeedegree, {
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getdegreeTypes();
    });
  }

  ///update dialog
  openUpdateDialog(data: any): void {
    const dialogRef = this.dialog.open(DialogUpdatedegree, {
    });
    id = data;
    dialogRef.afterClosed().subscribe(result => {
      this.getdegreeTypes();
    });
  }

  //delete dialog
  openDeleteDialog(data: any): void {
    const dialogRef = this.dialog.open(DialogDeletedegree, {
    });
    id = data;
    dialogRef.afterClosed().subscribe(result => {
      this.getdegreeTypes();
    });
  }

  ngOnInit(): void {
    this.getdegreeTypes();
  }

}

//create diaglog
@Component({
  selector: 'dialog-employee-degree',
  templateUrl: 'dialog-employee-degree.html'
})
export class DialogEmployeedegree {

  //attendance type info
  public degreeType: any = {
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
  createDegreeType() {
    if (this.degreeType.name) {
      this.api.createDegree(this.degreeType).subscribe({
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
  selector: 'dialog-edit-employee-degree',
  templateUrl: 'dialog-edit-employee-degree.html'
})
export class DialogUpdatedegree implements OnInit {

  //attendance type info
  public degreeType: any = {
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
  updateDegreeType() {
    if (this.degreeType.name) {
      this.degreeType.id = id;
      console.log(id);
      this.api.updateDegree(this.degreeType).subscribe({
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
    this.api.getDegreeById(id).subscribe({
      next: (res) => {
        if (res.success) {
          this.degreeType = res.data[0];
        }
      }
    })
  }
}


//**Delete Dialog */
@Component({
  selector: 'dialog-delete-employee-degree',
  templateUrl: 'dialog-delete-employee-degree.html'
})
export class DialogDeletedegree {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private api: ApiService,
    public dialogRef: MatDialogRef<EmployeeDegreeComponent>,
    private snackBar: SnackbarService,
  ) { }

  //delete attendance type
  deleteDegreeType() {
    this.api.deleteDegree(id).subscribe({
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
