import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { JoinComponent } from './join/join.component';
import { YourAirComponent } from './your-air/your-air.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HomeComponent,
    SignInComponent,
    JoinComponent,
    YourAirComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
