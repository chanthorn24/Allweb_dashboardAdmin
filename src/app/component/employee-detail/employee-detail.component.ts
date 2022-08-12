import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Observer } from 'rxjs';

export interface ExampleTab {
  label: string;
  content: string;
}

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
  asyncTabs!: Observable<ExampleTab[]>;

  employee_id!: string;
  constructor(private actRoute: ActivatedRoute) {
  this.employee_id = this.actRoute.snapshot.params['id'];

  this.asyncTabs = new Observable((observer: Observer<ExampleTab[]>) => {
      setTimeout(() => {
        observer.next([
          {label: 'Profile', content: '1'},
          {label: 'Project', content: '2'},
        ]);
      }, 1000);
    });
  }

  ngOnInit(): void {
  }
}
