import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagedObjectComponent } from './managed-object.component';

describe('ManagedObjectComponent', () => {
  let component: ManagedObjectComponent;
  let fixture: ComponentFixture<ManagedObjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagedObjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagedObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
