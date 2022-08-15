import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  old_password!: string;
  new_password!: string;
  hide: boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

}
