import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "app-join",
  templateUrl: "./join.component.html",
  styleUrls: ["./join.component.css"],
})
export class JoinComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  onSubmit() {
    console.warn(this.profileForm.value);
  }

  profileForm = new FormGroup({
    firstName: new FormControl(""),
    lastName: new FormControl(""),
    birthDate: new FormControl(""),
    password: new FormControl(""),
    username: new FormControl(""),
  });
}
