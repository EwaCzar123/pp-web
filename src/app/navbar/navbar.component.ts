import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { DataService } from "../data/data.service";
import { AreaService } from "../data/area.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
  constructor(private data: DataService, private areaService: AreaService) {}

  loginStatus$: Observable<boolean>;
  userName$: Observable<string>;

  ngOnInit(): void {
    this.loginStatus$ = this.data.isLoggesIn;
    this.userName$ = this.data.currentUserName;
  }
  onLogout() {
    this.areaService.clearCache(); //clear the browser cashe (area list), for another user list will be geerate once again
    this.data.logout();
  }
}