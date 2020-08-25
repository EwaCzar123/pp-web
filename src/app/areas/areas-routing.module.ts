import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AreaListComponent } from './area-list/area-list.component';
import { AreaDetailsComponent } from './area-details/area-details.component';
import { AuthGuardService } from '../guards/auth-guard.service';


const routes: Routes = [
  {path:'', component: AreaListComponent, canActivate:[AuthGuardService]},
  {path: 'area-list', component: AreaListComponent, canActivate:[AuthGuardService]},
  {path: ':id', component:AreaDetailsComponent, canActivate:[AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],

})
export class AreasRoutingModule { }
