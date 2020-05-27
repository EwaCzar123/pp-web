import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { SignInService } from "./sign-in.service";
import { FormGroup, FormControl } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { Validators } from "@angular/forms";
import { UserSettings } from "../data/user-settings";
import { JsonPipe } from "@angular/common";
import { DataService } from "../data/data.service";
import { error } from "@angular/compiler/src/util";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.css"],
})
export class SignInComponent implements OnInit {
  userSettings: UserSettings = {
    username: "",
    password: "",
  };
  error: any;
  public isLoginMode = true;

  constructor(private dataService: DataService) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.userSettings.username = form.value.username;
    this.userSettings.password = form.value.password;

    this.dataService.postUserSettings(this.userSettings).subscribe(
      (resData) => {
        console.log(resData);
      },
      (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage;
      }
    );
    form.reset();
  }
  ngOnInit(): void {}
  /* constructor(private fb: FormBuilder) {}

  loginForm = this.fb.group({
    login: ["", [Validators.required, Validators.minLength(4)]],
    password: [
      "",
      [Validators.required, Validators.minLength(8), Validators.maxLength(20)],
    ],
  });
*/
  /*
  loginForm = new FormGroup({
    login: new FormControl("", [Validators.required, Validators.minLength(4)]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20),
    ]),
  });
*/

  /*
  get name() {
    return this.loginForm.get("login");
  }*/
}
/*
export class SignInComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private signInService: SignInService) {}
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const username = form.value.username;
    const password = form.value.password;

    this.isLoading = true;
    if (this.isLoginMode) {
      this.signInService.login(username, password).subscribe(
        (resData) => {
          console.log(resData);
          this.isLoading = false;
        },
        (errorMessage) => {
          console.log(errorMessage);
          this.error = errorMessage;
          this.isLoading = false;
        }
      );
    } else {
      this.signInService.signup(password, username).subscribe(
        (resData) => {
          console.log(resData);
          this.isLoading = false;
        },
        (errorMessage) => {
          console.log(errorMessage);
          this.error = errorMessage;
          this.isLoading = false;
        }
      );
    }

    form.reset();
  }

  ngOnInit(): void {}
}
*/
