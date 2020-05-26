import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { SignInService } from "./sign-in.service";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.css"],
})
export class SignInComponent implements OnInit {
  isLoading = false;

  loginForm = new FormGroup({
    login: new FormControl(""),
    password: new FormControl(""),
  });
  ngOnInit(): void {}
  onSubmit() {
    console.warn(this.loginForm.value);
  }
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
