import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleSelectCustomFieldComponent } from './simple-select-custom-field.component';

describe('SimpleSelectCustomFieldComponent', () => {
  let component: SimpleSelectCustomFieldComponent;
  let fixture: ComponentFixture<SimpleSelectCustomFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleSelectCustomFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleSelectCustomFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
