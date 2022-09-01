import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  //sub menu
  showSubmenu: boolean = true;
  showReport: boolean = true;
  showSetting: boolean = false;
  //hamburger bar
  rotate: boolean = false;

  //user
  user_id!: number;
  user_name: any = "";
  imageURL: any = "";

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private api: ApiService,
  ) { }

  ngOnInit(): void {
    let email = this.authService.getEmail();
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


  //function logout
  logout() {
    this.authService.logout();
  }

}
