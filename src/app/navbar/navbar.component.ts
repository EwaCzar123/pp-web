import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { DataService } from "../data/data.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
  constructor(private data: DataService) {}

  loginStatus$: Observable<boolean>;
  userName$: Observable<string>;

  ngOnInit(): void {
    this.loginStatus$ = this.data.isLoggesIn;
    this.userName$ = this.data.currentUserName;
  }
  onLogout() {
    this.data.logout();
  }
}
