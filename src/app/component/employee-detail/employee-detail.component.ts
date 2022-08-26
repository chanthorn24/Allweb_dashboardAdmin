import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

export interface ProfileTab {
  label: string;
  content: string;
}

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
  asyncTabs!: Observable<ProfileTab[]>;

  //employee info
  employee_id!: string;
  employees: any = [];

  constructor(
    private actRoute: ActivatedRoute,
    private api: ApiService,
  ) {
    this.employee_id = this.actRoute.snapshot.params['id'];

    this.asyncTabs = new Observable((observer: Observer<ProfileTab[]>) => {
      setTimeout(() => {
        observer.next([
          { label: 'Profile', content: '1' },
          { label: 'Project', content: '2' },
        ]);
      }, 500);
    });
  }

  ngOnInit(): void {
    this.api.getOneUser(this.employee_id).subscribe({
      next: (res) => {
        this.employees = res.data;
        console.log(this.employees);

      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
