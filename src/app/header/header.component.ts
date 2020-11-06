import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit,OnDestroy {

  constructor(private authService: AuthService) { }

  isAuthenticated = false;
  subUser:Subscription;
  loginUser:User

  ngOnInit() {

    this.subUser =   this.authService.user.subscribe(user => {
      this.isAuthenticated = user ? true : false;
      this.loginUser = user;
    })

  }


  onLogout(){
    this.authService.logout()
  }

  ngOnDestroy(){
    this.authService.user.unsubscribe();

   }

}
