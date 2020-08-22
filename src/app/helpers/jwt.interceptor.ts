import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { DataService } from '../data/data.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn:'root'
})

export class JwtInterceptor implements HttpInterceptor{
    
    constructor(private acct: DataService){}

    intercept(request : HttpRequest<any>,next : HttpHandler):Observable<HttpEvent<any>>
    {
        //add authorization header with jwt token if available
        let currenuser=this.acct.isLoggesIn;
        let token=localStorage.getItem('jwt');

        if(currenuser && token!==undefined)
        {
            request = request.clone({
                setHeaders:
                {
                    Authorization:`Bearer ${token}`
                }
            });
        }

        return next.handle(request);
    }
}