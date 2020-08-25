import { Component, OnInit, ViewChild, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Area } from 'src/app/interfaces/area';
import { Observable, Subject } from 'rxjs';
import {DataTableDirective} from 'angular-datatables';
import { AreaService } from 'src/app/data/area.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-area-list',
  templateUrl: './area-list.component.html',
  styleUrls: ['./area-list.component.css']
})
export class AreaListComponent implements OnInit{

  //For the FormControl - Adding areas
  insertForm: FormGroup;
  latitude: FormControl;
  longitude:FormControl;
  radius:FormControl;

  //Updating area
  updateForm:FormGroup;
  _radius:FormControl;
  _id:FormControl;

  //Add Modal
  @ViewChild('template') modal: TemplateRef<any>;

  //Update Modal
  @ViewChild('editTemplate') editmodal: TemplateRef<any>;

  //Modal propertise
  modalMessage:string;
  modalRef: BsModalRef;
  selectedArea: Area;
  areas$ :Observable<Area[]>;
  areas: Area[]=[];
  userRoleStatus:string;

  //Displaying area list
  dtOptions:DataTables.Settings={};
  dtTrigger:Subject<any>=new Subject();

  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  constructor(private areaservice:AreaService,
              private modalService:BsModalService,
              private fb:FormBuilder,
              private chRef : ChangeDetectorRef,
              private router: Router) { }
  
   onAddArea()
   {
     this.modalRef=this.modalService.show(this.modal);
   }

   //Method to add new Area
   onSubmit()
   {
     let newArea=this.insertForm.value;

     this.areaservice.insertArea(newArea).subscribe(
       result=>
       {
         this.areaservice.clearCache();
         this.areas$=this.areaservice.getAreas();

         this.areas$.subscribe(newlist=>{
           this.areas=newlist;
           this.modalRef.hide();
           this.insertForm.reset();
           this.rerender();
         });
         console.log('Area added');
       },
       error=>console.log('Could not add Producy')
     )
   }
// We use this method to destroy old table and re-render new table
   rerender()
   {
     this.dtElement.dtInstance.then((dtInstance: DataTables.Api)=>
     {
       //Destroy the table fisrt in the current context
       dtInstance.destroy();

       //Call the dtTrigger to rerender again
       this.dtTrigger.next();
     });
   }

   //
   onUpdate()
   {
     let editArea=this.updateForm.value;
     this.areaservice.updateArea(editArea.id,editArea.radius).subscribe(
       result=>
       {
         console.log('Area Updated');
         this.areaservice.clearCache();
         this.areas$=this.areaservice.getAreas();
         this.areas$.subscribe(updatdlist=>
          {
            this.areas=updatdlist;
            this.modalRef.hide();
            this.rerender();
          });
       },
       error=>console.log('Could Not Update Area')
     )
   }

   onUpdateModal(areaEdit: Area):void
   {
     this._id.setValue(areaEdit.id);
     this._radius.setValue(areaEdit.radius);

     //update the form
     this.updateForm.setValue({
       'id':this._id.value,
       'radius':this._radius.value
     });

     //display modal to user
     this.modalRef=this.modalService.show(this.editmodal);
   }
   onDelete(area:Area):void
   {
     this.areaservice.deleteArea(area.id).subscribe(
       result=>{
         this.areaservice.clearCache();
         this.areas$=this.areaservice.getAreas();
         this.areas$.subscribe(newlist=>
          {
            this.areas=newlist;

            this.rerender();
          })
       }
     )
   }

   onSelect(area:Area):void
   {
    this.selectedArea=area;
    //to navigate user to area-details
    this.router.navigateByUrl("/areas/"+area.id);
   }

  ngOnInit(): void {
    this.dtOptions={
      pagingType: 'full_numbers',
      pageLength: 5,
      autoWidth:true,
      order:[[0,'desc']]
    };

    this.areas$= this.areaservice.getAreas();
    this.areas$.subscribe(result=>
    {
      this.areas=result;
      
      this.chRef.detectChanges();
      
      this.dtTrigger.next();
    });

    
    //Modal Message
    this.modalMessage="All Fields Are Mandatory";

    this.longitude=new FormControl('',[Validators.required,Validators.min(0)]);
    this.latitude=new FormControl('',[Validators.required,Validators.min(0)]);
    this.radius=new FormControl('',[Validators.required,Validators.min(0)]);

    this.insertForm=this.fb.group({
      'longitude':this.longitude,
      'latitude':this.latitude,
      'radius':this.radius
    })

    //Initializing Update Area properties
    this._radius=new FormControl('',[Validators.required,Validators.min(0)]);
    this._id =new FormControl();

    this.updateForm = this.fb.group(
      {
        'id':this._id,
        'radius':this._radius
      }
    );
  }
  ngOnDestroy():void
  {
    this.dtTrigger.unsubscribe();
  }
}
