import { Injectable } from "@angular/core";
import { UserSettings, UserRegistrationData } from "./user-settings";
import {
  from,
  Observable,
  of,
  throwError,
  Subject,
  BehaviorSubject,
} from "rxjs";
import { catchError, retry, map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
/*
interface SignInResponseData {
  idToken: String;
}*/

@Injectable({
  providedIn: "root",
})
export class DataService {
  constructor(private http: HttpClient, private router: Router) {}

  //User related protperies
  private loginStatus = new BehaviorSubject<boolean>(this.checkLoginStatus());
  private username = new BehaviorSubject<string>(
    localStorage.getItem("username")
  );
  private role = new BehaviorSubject<string>(localStorage.getItem("role"));

  //Regiister method
  register(
    firstName: string,
    lastName: string,
    birthDate: string,
    password: string,
    username: string,
    role: string
  ) {
    return this.http
      .post<any>(
        "https://polsl-pp-server.herokuapp.com/api/authenticate/register",
        {
          firstName,
          lastName,
          birthDate,
          password,
          username,
          role,
        }
      )
      .pipe(
        map(
          (result) => {
            //registration was successful
            return result;
          },
          (error) => {
            return error;
          }
        )
      );
  }
  //Login method
  login(username: string, password: string) {
    console.log({ username, password });
    return this.http
      .post<any>(
        "https://polsl-pp-server.herokuapp.com/api/authenticate/login",
        { username, password }
      )
      .pipe(
        //to handle the response, multiple functions in pipe function

        //to manipulateresult recived by HTTP
        map((result) => {
          //what we want to do with result
          //result contains a token?
          if (result && result.token) {
            this.loginStatus.next(true);
            localStorage.setItem("loginStatus", "1");
            localStorage.setItem("jwt", result.token);
            localStorage.setItem("username", result.username);
            localStorage.setItem("expiration", result.expiration);
            localStorage.setItem("role", result.role);
          }
          return result;
        })
      );
  }
  logout() {
    //Set loginstatus to false and delete saved jwt cookie
    this.loginStatus.next(false);
    localStorage.removeItem("username");
    localStorage.removeItem("jwt");
    localStorage.removeItem("role");
    localStorage.setItem("loginStatus", "0");
    this.router.navigate(["/sign-in"]);
    console.log("Logged out successfully");
  }
  checkLoginStatus(): boolean {
    return false;
  }
  get isLoggesIn() {
    return this.loginStatus.asObservable();
  }
  get currentUserName() {
    return this.username.asObservable();
  }
  get currentUserRole() {
    return this.role.asObservable();
  }
  /*
  postUserRegistration(UserRegistrationData: UserRegistrationData) {
    return this.http
      .post<any>(
        "https://polsl-pp-server.herokuapp.com/api/authenticate/register",
        UserRegistrationData
      )
      .pipe();
  }*/
}
