import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  hide = true;
  link!: string;
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {


  }

  ngOnInit(): void {
    if (this.authService.isUserLoggedIn()) {
      this.router.navigateByUrl('/');
    }
    this.route.queryParams
      .subscribe(params => {
        console.log(params['verify']);
      }
      );

  }

}
