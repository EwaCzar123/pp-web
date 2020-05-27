import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, NgForm } from "@angular/forms";
import { Validators } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { UserRegistrationData } from "../data/user-settings";
import { DataService } from "../data/data.service";

@Component({
  selector: "app-join",
  templateUrl: "./join.component.html",
  styleUrls: ["./join.component.css"],
})
export class JoinComponent implements OnInit {
  UserRegistrationData: UserRegistrationData = {
    firstName: "",
    lastName: "",
    birthDate: "",
    password: "",
    username: "",
    role: "WEB_USER",
  };
  error: any;
  constructor(private dataService: DataService) {}
  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.UserRegistrationData.username = form.value.username;
    this.UserRegistrationData.password = form.value.password;
    this.UserRegistrationData.birthDate = form.value.birthDate;
    this.UserRegistrationData.firstName = form.value.firstName;
    this.UserRegistrationData.lastName = form.value.lastName;

    this.dataService.postUserRegistration(this.UserRegistrationData).subscribe(
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
}
