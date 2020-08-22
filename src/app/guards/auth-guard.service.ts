import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from '../data/data.service';
import {take, map} from 'rxjs/operators';
import { Router } from '@angular/router'; 

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private acct: DataService, private router:Router)  { }

  canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot) : Observable<boolean>
  {
    return this.acct.isLoggesIn.pipe(take(1),map((loginStatus: boolean)=>
    {
      const destination: string = state.url;
      const areaId =route.params.id;

      //To check if user is logged
      if(!loginStatus)
      {
        this.router.navigate(['/login'],{queryParams:{returnUrl:state.url}});
        return false;
      }
      
      //if user is logged in
     /* switch(destination)
      {
        case '/areas':
        case '/areas/' + areaId:
        case '/areas/update':
        case '/area/add':
        case '/areas'
          {
            return true;
          }
      }*/

      return true;
    }))
  }

}
