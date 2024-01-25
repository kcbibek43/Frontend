import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserLogin, User } from '../Models/User'; // Import your UserLogin and User models
import { LOGIN_API, REGISTER_API } from '../constants/constants'; // Import your API constants

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(userLogin: UserLogin) {
    return this.http.post(LOGIN_API, userLogin).pipe(
      catchError(error => {
        // Handle your error here
        console.error('An error occurred:', error);
        return throwError(error);
      })
    );
  }

  register(user: User) {
    return this.http.post(REGISTER_API, user).pipe(
      catchError(error => {
        // Handle your error here
        console.error('An error occurred:', error);
        return throwError(error);
      })
    );
  }
}
