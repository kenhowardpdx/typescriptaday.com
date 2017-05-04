import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  constructor() { }

  isLoggedIn: boolean =  false;

  redirectUrl: string;

  login() {

  }

  logout() {
    this.isLoggedIn = false;
  }

}
