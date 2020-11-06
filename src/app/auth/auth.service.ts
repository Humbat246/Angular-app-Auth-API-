import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import { Subject, throwError } from "rxjs"
import { User } from './user.model';
import { Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})


export class AuthService {

  user = new Subject<User>();

  constructor(private http: HttpClient,private router:Router) { }

  signup(email: string, password: string) {
    return this.http
      .post("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAgXN1_sjsv3_vuhwYSBTkP63bJ8gI3raU",
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(resError => {
          let errorMessage = "An unknown error ocurred!";

          if (resError.error.error.message == 'EMAIL_EXISTS') {
            errorMessage = 'The email address is already in use by another account.'
          }
          return throwError(errorMessage);
        }),
        tap(resData => {
          const expirationDate = new Date(
            new Date().getTime() + +resData['expiresIn'] * 1000
          );
          const user = new User(resData['email'], resData['localId'], resData['idToken'], expirationDate);
          this.user.next(user);
          console.log(user)
        })
      )

  };

  login(email: string, password: string) {
    return this.http
      .post("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAgXN1_sjsv3_vuhwYSBTkP63bJ8gI3raU",
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(resError => {

          let errorMessage = "An unknown error ocurred!";

          if (resError.error.error.message == 'EMAIL_NOT_FOUND' || resError.error.error.message == 'INVALID_PASSWORD') {
            errorMessage = 'Email or password  invalid'
          } else {
            errorMessage = "An unknown error ocurred!"
          }
          return throwError(errorMessage);
        }),
          tap(resData => {
            const expirationDate = new Date(
              new Date().getTime() + +resData['expiresIn'] * 1000
            );
            const user = new User(resData['email'], resData['localId'], resData['idToken'], expirationDate);
            this.user.next(user);
            console.log(user)
          })
      )


  };
  logout(){
    this.user.next(null);
    this.router.navigate(['./Auth'])

  };




}

