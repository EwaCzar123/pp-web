import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';


interface SignInResponseData {
idToken: String;
}

@Injectable({providedIn: 'root'})
export class SignInService {

    constructor(private http: HttpClient) {}
    signup(password: string, username: string) {
       return this.http.post<SignInResponseData>('https://polsl-pp-server.herokuapp.com/api/authenticate/login',
        {
            password,
            username
        }
        ).pipe(catchError(errorRes => {
            let errorMessage = 'Wystąpił nieznany błąd.';
            if (!errorRes.status) {
                return throwError(errorMessage);
            }
            switch (errorRes.status) {
                case 401:
                    errorMessage = 'Wystąpił bład. Podany użytkownik nieistnieje.';
              }
            return throwError(errorMessage);
        }));
    }

    login(password: string, username: string) {
      return this.http.post<SignInResponseData>('https://polsl-pp-server.herokuapp.com/api/authenticate/login',
        {
              password,
              username
        }
      );
}
}
