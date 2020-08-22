import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Area } from "../interfaces/area";
import { User } from "../interfaces/user";
import { Response } from "../interfaces/response";
import { shareReplay, flatMap, first, map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AreaService {
  constructor(private http: HttpClient) {}
  id: string;
  private getListUrl: string =
    "https://polsl-pp-server.herokuapp.com/api/webusers/details";
  private addAreaUrl: string =
    "https://polsl-pp-server.herokuapp.com/api/webusers/area";
  private deleteAreaUrl: string =
    "https://polsl-pp-server.herokuapp.com/api//webusers/area/";
  private updateAreaRadiusUrl: string =
    "https://polsl-pp-server.herokuapp.com/api/webusers/";

  //Will hold all areas
  private area$: Observable<Area[]>;
  private Response$: Observable<Response>;

  getAreas(): Observable<Area[]> {
    if (!this.area$) {
      this.area$ = this.http
        .get<Response>(this.getListUrl)
        .pipe(map((response: Response) => response.areas));
    }
    return this.area$;
  }

  //Get Area by ID
  getAreaById(id: number): Observable<Area> {
    return this.getAreas().pipe(
      flatMap((result) => result),
      first((area) => area.id == id)
    );
  }

  //Instert area
  insertArea(newArea: Area): Observable<Area> {
    return this.http.post<Area>(this.addAreaUrl, newArea);
  }
  //Update area
  updateArea(id: number, radius: number): Observable<Area> {
    return this.http.patch<Area>(
      this.updateAreaRadiusUrl + id + "/" + radius,
      radius
    );
  }

  //Delete area
  deleteArea(id: number): Observable<any> {
    return this.http.delete(this.deleteAreaUrl + id);
  }

  clearCache() {
    this.area$ = null;
  }
}