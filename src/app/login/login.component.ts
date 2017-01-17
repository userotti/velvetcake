import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire } from 'angularfire2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  model: any = {};
  loading = false;
  returnUrl: string;

  constructor(
      public af: AngularFire,
      private router: Router) { }


  ngOnInit() {
    // reset login status
    this.af.auth.logout();

  }

  login() {
    this.loading = true;

    this.af.auth.login({ email: this.model.email, password: this.model.password }).then((auth) => {
      this.loading = false;
      this.router.navigate(['/cms/products']);

    },  (err) => {
      this.loading = false;
    });
  }

}
