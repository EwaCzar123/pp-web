import { Component, OnInit, Input, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AreaService } from 'src/app/data/area.service';
import { Area } from 'src/app/interfaces/area';
import { DependentArea } from 'src/app/interfaces/dependentArea';
import { Observable } from 'rxjs';
import { Positio } from 'src/app/interfaces/position';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-area-details',
  templateUrl: './area-details.component.html',
  styleUrls: ['./area-details.component.css']
})
export class AreaDetailsComponent implements OnInit {

  //Input (because is recive data) decorator - we share area data in two components, 
  @Input() area:Area;

  //See notification Modal
  @ViewChild('notificationTemplate') modal: TemplateRef<any>;
  modalRef: BsModalRef;

  dependentAreas$:Observable<DependentArea[]>;
  dependentAreas:DependentArea[]=[];
  selectedArea:DependentArea;

  title='example';

  position={
    lat:0,
    lng:0
  };

dependentPosition:Positio[]=[];
positionToAdd:Positio;

  label={
    color:'white',
    text:'YOUR LOCATION',
    background:'yellow'
  };

  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private areaservice:AreaService,
    private modalService:BsModalService,
  ) { }

  openInfo(position:Positio)
  { var i=0;
    while (position.lat!=this.dependentAreas[i].latitude&&position.lng!=this.dependentAreas[i].longitude) {
      this.selectedArea=this.dependentAreas[i];
      i++;
    }
    this.modalRef=this.modalService.show(this.modal);
  }

  ngOnInit(): void {
    let id = + this.route.snapshot.params['id']; //+ we can conver id 
  
    this.areaservice.getAreaById(id).subscribe(result=>this.area=result); 
    console.log(this.area);
    this.dependentAreas$=this.areaservice.getDependentAreas(id);//.subscribe((result)=>this.dependentAreas=result);
    this.dependentAreas$.subscribe(result=>
      {
        this.dependentAreas=result;
       // console.log(this.dependentAreas);
        this.dependentAreas.forEach(area => {
          let pos:Positio={lat:0,lng:0};
          pos.lng=area.longitude;
          pos.lat=area.latitude;
          this.dependentPosition.push(pos);
        });     
      });
    
    this.position.lat = this.area.latitude;
    this.position.lng = this.area.longitude;
    
  }
}
