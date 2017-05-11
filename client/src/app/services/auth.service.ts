import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {

  constructor(private _http: Http) { }

  isLoggedIn: boolean =  false;

  redirectUrl: string;

  login({ email, password }) {
    return this._http.post('/api/auth', { email, password }).toPromise();
  }

  logout() {
    this.isLoggedIn = false;
  }

}
