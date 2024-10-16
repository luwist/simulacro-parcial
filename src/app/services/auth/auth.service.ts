import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser: any;

  login(account: any) {
    this.currentUser = account;
  }
}
