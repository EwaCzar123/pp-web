import { Component, OnInit, ViewChild, TemplateRef } from "@angular/core";
import {
  FormGroup,
  FormControl,
  NgForm,
  AbstractControl,
  ValidatorFn,
} from "@angular/forms";
import { Validators } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { UserRegistrationData } from "../data/user-settings";
import { DataService } from "../data/data.service";
import { Router, ActivatedRoute } from "@angular/router";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";

@Component({
  selector: "app-join",
  templateUrl: "./join.component.html",
  styleUrls: ["./join.component.css"],
})
export class JoinComponent implements OnInit {
  //Properties
  insertForm: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  birthDate: FormControl;
  password: FormControl;
  cpassword: FormControl;
  username: FormControl;
  role: FormControl;
  modalRef: BsModalRef;
  errorList: string[];
  modalMessage: string;

  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private modalService: BsModalService
  ) {}
  @ViewChild("template") modal: TemplateRef<any>;

  ngOnInit(): void {
    this.firstName = new FormControl("", [Validators.required]);
    this.lastName = new FormControl("", [Validators.required]);
    this.birthDate = new FormControl("", [Validators.required]);
    this.password = new FormControl("", [
      Validators.required,
      Validators.maxLength(20),
      Validators.minLength(8),
      Validators.pattern(
        "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{7,20}"
      ),
    ]);
    this.cpassword = new FormControl("", [
      Validators.required,
      this.MustMatch(this.password),
    ]);
    this.username = new FormControl("", [Validators.required]);
    this.role = new FormControl("WEB_USER", [Validators.required]);

    this.insertForm = this.fb.group({
      firstName: this.firstName,
      lastName: this.lastName,
      birthDate: this.birthDate,
      password: this.password,
      cpassword: this.cpassword,
      username: this.username,
      role: this.role,
    });
  }

  onSubmit() {
    let userDetails = this.insertForm.value;
    this.dataService
      .register(
        userDetails.firstName,
        userDetails.lastName,
        userDetails.birthDate.split('-').join('.'),
        userDetails.password,
        userDetails.username,
        userDetails.role
      )
      .subscribe(
        (result) => {
          this.router.navigate(["/sign-in"]);
        },
        (error) => {
          this.modalMessage = "Your registration was unsuccessful.";
          this.modalRef = this.modalService.show(this.modal);
        }
      );
  }

  //Custom validator-cpassword==password?
  MustMatch(passwordControl: AbstractControl): ValidatorFn {
    return (
      cpasswordControl: AbstractControl
    ): { [key: string]: boolean } | null => {
      //return null if controls haven't initialised yet
      if (!passwordControl && !cpasswordControl) {
        return null;
      }
      //return null if another validator has already found an error on the matchingControl
      if (!cpasswordControl && !passwordControl.hasError) {
        return null;
      }
      //set error on matchingControl if validation fails
      if (passwordControl.value !== cpasswordControl.value) {
        return { mustMatch: true };
      } else {
        return null;
      }
    };
  }
}
