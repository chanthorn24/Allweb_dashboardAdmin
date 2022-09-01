import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-navigation-user',
  templateUrl: './navigation-user.component.html',
  styleUrls: ['./navigation-user.component.css']
})
export class NavigationUserComponent {
  //user name
  user_name: any = "";
  imageURL: any = "";
  user_id!: number;

  //sub menu
  showSubmenu: boolean = true;
  showReport: boolean = true;
  showSetting: boolean = false;
  //hamburger bar
  rotate: boolean = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private api: ApiService,
    private auth: AuthService,
  ) { }

  logout() {
    this.authService.logout();
  }
  ngOnInit(): void {
    //email user
    let email = this.auth.getEmail();
    this.api.getOneUserByEmail(email).subscribe({
      next: (res) => {
        if (res.success) {
          this.user_name = res.data[0].firstName + " " + res.data[0].lastName;
          this.imageURL = res.data[0].imageURL;
          this.user_id = res.data[0].id;
        }
      }
    })
  }

}
