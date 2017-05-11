import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "app/services";

@Component({
  selector: 'ts-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private _fb: FormBuilder, private _auth: AuthService) { }

  form: FormGroup;

  loginFormErrors = {
    Email: '',
    Password: ''
  }

  validationMessages = {
    Email: {
      required: 'Email Address is Required',
      email: 'Not a Valid Email Address'
    },
    Password: {
      required: 'Password is Required'
    }
  }

  buildForm() {
    this.form = this._fb.group({
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', Validators.required]
    });
  }

  markInvalidFields() {
    if (!this.form) { return; }
    const form = this.form;
    for (const field in this.loginFormErrors) {
      this.loginFormErrors[field] = '';
      const control = form.get(field);
      if (control && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.loginFormErrors[field] += messages[key] + '<br />';
        }
      }
    }
  }

  ngOnInit() {
    this.buildForm();
  }

  async onSubmit() {
    if (this.form.invalid) {
      this.markInvalidFields();
      return;
    }

    try {
      let { Email: email, Password: password } = this.form.value;

      let token = (await this._auth.login({ email, password })).json().data;
      debugger;
    } catch (error) {
      debugger;
    }
  }

}
