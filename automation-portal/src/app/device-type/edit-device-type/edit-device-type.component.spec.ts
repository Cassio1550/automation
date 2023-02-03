import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDeviceTypeComponent } from './edit-device-type.component';

describe('EditDeviceTypeComponent', () => {
  let component: EditDeviceTypeComponent;
  let fixture: ComponentFixture<EditDeviceTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDeviceTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDeviceTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
