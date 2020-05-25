import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent } from './home/home.component';
import { SignInComponent } from './login/sign-in.component';
import {JoinComponent } from './register/join.component';
import { YourAirComponent } from './your-air/your-air.component';


const routes: Routes = [
{path: '', component: YourAirComponent},
{path: 'home', component: HomeComponent},
{path: 'sign-in', component: SignInComponent},
{path: 'join', component: JoinComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
