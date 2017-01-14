import { Component, OnInit } from '@angular/core';
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

  constructor(public af: AngularFire) { }



  ngOnInit() {



  }

  loginClick() {
    this.loading = true;
    this.af.auth.login({ email: this.model.email, password: this.model.password });
  }

}
