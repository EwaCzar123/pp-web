import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Area } from "../interfaces/area";
import { User } from "../interfaces/user";
import {DependentArea} from "../interfaces/dependentArea";
import { Response } from "../interfaces/response";
import { shareReplay, flatMap, first, map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AreaService {
  constructor(private http: HttpClient) {}
  id: string;
  private getListUrl: string =
    "https://pp-server.herokuapp.com/api/areas";
  private addAreaUrl: string =
    "https://pp-server.herokuapp.com/api/areas";
  private deleteAreaUrl: string =
    "https://pp-server.herokuapp.com/api/areas";
  private updateAreaRadiusUrl: string =
    "https://pp-server.herokuapp.com/api/areas";
    private getDependentAreasUrl: string =
    "https://pp-server.herokuapp.com/api/notifications";

  //Will hold all areas
  private area$: Observable<Area[]>;
  private Response$: Observable<Response>;

  getAreas(): Observable<Area[]> {

   // return this.area$=this.http.get<Area[]>(this.getListUrl);
   if (!this.area$) 
   {
       this.area$ = this.http.get<Area[]>(this.getListUrl).pipe(shareReplay());
   }

   return this.area$;
  }

  //Get Area by ID
  getAreaById(id: number): Observable<Area> {
    return this.getAreas().pipe(
      flatMap(result => result),
      first(area => area.id == id)
    );
  }

  //Instert area
  insertArea(newArea: Area): Observable<Area> {
    return this.http.post<Area>(this.addAreaUrl, newArea);
  }
  //Update area
  updateArea(id: number, radius: number): Observable<Area> {
    return this.http.patch<Area>(
      this.updateAreaRadiusUrl,
      {id,radius}
    );
  }

  //Delete area
  deleteArea(id: number): Observable<any> {
    var httpParams= new HttpParams().set('id', id.toString());
    let options = {params: httpParams}
    return this.http.delete(this.deleteAreaUrl, options);
  }

  //getting reported areas 
  getDependentAreas(id:number): Observable<DependentArea[]>{
    var httpParams= new HttpParams().set('areaId', id.toString());
    let options = {params: httpParams}
    return this.http.get<DependentArea[]>(this.getDependentAreasUrl,options);
  }

  clearCache() {
    this.area$ = null;
  }
}