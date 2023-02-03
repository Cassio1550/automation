import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditManagedObjectComponent } from './edit-managed-object.component';

describe('EditManagedObjectComponent', () => {
  let component: EditManagedObjectComponent;
  let fixture: ComponentFixture<EditManagedObjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditManagedObjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditManagedObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
