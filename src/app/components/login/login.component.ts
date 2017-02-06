import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire } from 'angularfire2';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],

})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  returnUrl: string;

  constructor(
      public af: AngularFire,
      private router: Router,
      private fb: FormBuilder) {

      this.createForm();
  }


  ngOnInit() {
    // reset login status
    this.af.auth.logout();

  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  login() {

    console.log(this.loginForm.value);

    this.loading = true;
    this.af.auth.login(this.loginForm.value).then((auth) => {
      this.loading = false;
      this.router.navigate(['/cms/products']);

    },  (err) => {
      this.loading = false;
    });
  }

}
