import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AreaService } from 'src/app/data/area.service';
import { Area } from 'src/app/interfaces/area';
import { DependentArea } from 'src/app/interfaces/dependentArea';

@Component({
  selector: 'app-area-details',
  templateUrl: './area-details.component.html',
  styleUrls: ['./area-details.component.css']
})
export class AreaDetailsComponent implements OnInit {

  //Input (because is recive data) decorator - we share area data in two components, 
  @Input() area:Area;

  dependentAreas:DependentArea[]=[];

  title='example';
  position={
    lat:0,
    lng:0
  };

  label={
    color:'white',
    text:'YOUR LOCATION',

  };

  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private areaservice:AreaService
  ) { }

  //dependentAreas: DependentArea[];

  ngOnInit(): void {
    let id = + this.route.snapshot.params['id']; //+ we can conver id 
  
    this.areaservice.getAreaById(id).subscribe(result=>this.area=result); 
    console.log(this.area);
    this.areaservice.getDependentAreas(id).subscribe(result=>this.dependentAreas=result);
    this.position.lat = this.area.latitude;
    this.position.lng = this.area.longitude;
   // console.log(this.dependentAreas);
  }

  
  

}
