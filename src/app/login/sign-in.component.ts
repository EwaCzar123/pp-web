import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { FormGroup, FormControl } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { Validators } from "@angular/forms";
import { UserSettings } from "../data/user-settings";
import { JsonPipe } from "@angular/common";
import { DataService } from "../data/data.service";
import { error } from "@angular/compiler/src/util";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.css"],
})
export class SignInComponent implements OnInit {
  insertForm: FormGroup;
  username: FormControl;
  password: FormControl;
  returnUrl: string;
  ErrorMessage: string;
  invalidLogin: boolean;
  error: any;
  private loginStatus: boolean;

  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.username = new FormControl("", [Validators.required]);
    this.password = new FormControl("", [
      Validators.required,
      Validators.maxLength(20),
      Validators.minLength(8),
    ]);

    this.returnUrl = this.route.snapshot.queryParams["returnUrl" || "/"];
    this.insertForm = this.fb.group({
      username: this.username,
      password: this.password,
    });
  }
  onSubmit() {
    let userlogin = this.insertForm.value;

    this.dataService.login(userlogin.username, userlogin.password).subscribe(
      (result) => {
        let token = (<any>result).token;
        console.log(token);
        console.log(result.role);
        console.log("User Logged in successfully");
        this.invalidLogin = false;
        console.log(this.returnUrl);
        this.router.navigateByUrl(this.returnUrl);
      },
      (error) => {
        this.invalidLogin = true;
        this.ErrorMessage = "Invalid details supplied";

        console.log(this.ErrorMessage);
      }
    );
  }
  /*  kod 1

    onSwitchMode() {}

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
    )
    form.reset();
  }*/
}
