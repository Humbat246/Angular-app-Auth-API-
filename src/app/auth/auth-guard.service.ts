import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}


  isAuthenticated:boolean =false;

  canActivate(): boolean {


    this.auth.user.subscribe(usr=>{
      console.log(usr)
      this.isAuthenticated = usr ? true : false
    })
    if (!this.isAuthenticated) {
      console.log(this.isAuthenticated)
      this.router.navigate(['./Auth']);
      return false;
    }else{
      return true;

    }
  }
}
