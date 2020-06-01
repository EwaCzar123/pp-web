import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeroesComponent } from "./heroes/heroes.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HomeComponent } from "./home/home.component";
import { SignInComponent } from "./login/sign-in.component";
import { JoinComponent } from "./register/join.component";
import { YourAirComponent } from "./your-air/your-air.component";
import { LoadingSpinnerComponent } from "./shared/loading-spinner/loading-spinner.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { ModalModule } from "ngx-bootstrap/modal";

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HomeComponent,
    SignInComponent,
    JoinComponent,
    YourAirComponent,
    LoadingSpinnerComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
