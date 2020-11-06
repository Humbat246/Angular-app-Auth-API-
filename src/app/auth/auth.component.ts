import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { User } from './user.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {



  constructor(private authService: AuthService,public router:Router) { }

  ngOnInit(): void {
  }

  isLoginMode = true;
  isLoading = false;
  error: string = null;
  user:User;

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
    console.log(this.isLoginMode)
  }

  onSubmit(form: NgForm) {
    // console.log(form.value);



    if (!form.valid) { 
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;

    if (this.isLoginMode) {
      this.authService.login(email, password).subscribe(
        resData => {
          console.log(resData);
          this.isLoading = false;
          this.router.navigate(['./Home']);
        },
        resError => {
         this.error = resError;
          this.isLoading = false;
        }
      )
    } else {
      this.authService.signup(email, password).subscribe(
        resData => {
          this.isLoading = false;
          this.router.navigate(['./Home']);
        },
        resError => {
          this.error = resError;
          this.isLoading = false;
        }
      )
    }
    form.reset();
  }


}
