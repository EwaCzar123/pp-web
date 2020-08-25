import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AreasRoutingModule } from './areas-routing.module';
import { AreaListComponent } from './area-list/area-list.component';
import { AreaDetailsComponent } from './area-details/area-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { AuthGuardService } from '../guards/auth-guard.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from '../helpers/jwt.interceptor';
import {GoogleMapsModule} from '@angular/google-maps';


@NgModule({
  declarations: [AreaListComponent, AreaDetailsComponent],
  imports: [
    CommonModule,
    AreasRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    GoogleMapsModule
  ],
  providers: [
    AuthGuardService,
    {provide:HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi:true}
  ],
})
export class AreasModule { }
