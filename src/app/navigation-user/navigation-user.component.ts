import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { ApiService } from '../services/api.service';
// export interface ChildrenItems {
//     state: string;
//     name: string;
//     type?: string;
//   }

// export interface Menu {
//     state: string;
//     name: string;
//     type: string;
//     icon: string;
//     children?: ChildrenItems[];
// }

// const MENUITEMS = [
//     {
//         state: 'dashboard',
//         name: 'Dashboard',
//         type: 'link',
//         icon: 'dashboard'
//     },
//     {
//         state: 'setting',
//         name: 'Settings',
//         type: 'sub',
//         icon: 'settings',
//         children: [
//             {
//                 state: 'station_management',
//                 name: 'Station Management',
//                 type: 'parent',
//                 grand_children: [
//                     { state: 'station', name: 'Station' },
//                     { state: 'shifts_work', name: 'Shifts Work' },
//                     { state: 'fuel_price', name: 'Fule Price' },
//                     { state: 'tank_management', name: 'Tank Management' }
//                 ]
//             }
//         ]
//     }
// ];


@Component({
  selector: 'app-navigation-user',
  templateUrl: './navigation-user.component.html',
  styleUrls: ['./navigation-user.component.css']
})
export class NavigationUserComponent {
  //user name
  user_name: any = "";
  imageURL: any = "";

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
        }
      }
    })
  }

}
