import { Injectable } from "@angular/core";
import { UserSettings, UserRegistrationData } from "./user-settings";
import { from, Observable, of, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";

interface SignInResponseData {
  idToken: String;
}

@Injectable({
  providedIn: "root",
})
export class DataService {
  constructor(private http: HttpClient) {}

  postUserSettings(UserSettings: UserSettings) {
    console.log(UserSettings);
    return this.http
      .post<SignInResponseData>(
        "https://polsl-pp-server.herokuapp.com/api/authenticate/login",
        UserSettings
      )
      .pipe();
    //return of(UserSettings);
  }
  postUserRegistration(UserRegistrationData: UserRegistrationData) {
    return this.http
      .post<SignInResponseData>(
        "https://polsl-pp-server.herokuapp.com/api/authenticate/register",
        UserRegistrationData
      )
      .pipe();
  }
}
