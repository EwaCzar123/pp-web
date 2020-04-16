import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YourAirComponent } from './your-air.component';

describe('YourAirComponent', () => {
  let component: YourAirComponent;
  let fixture: ComponentFixture<YourAirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YourAirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YourAirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
