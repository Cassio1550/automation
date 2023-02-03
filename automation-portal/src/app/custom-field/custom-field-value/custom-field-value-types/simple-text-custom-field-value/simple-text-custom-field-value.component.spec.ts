import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleTextCustomFieldValueComponent } from './simple-text-custom-field-value.component';

describe('SimpleTextCustomFieldValueComponent', () => {
  let component: SimpleTextCustomFieldValueComponent;
  let fixture: ComponentFixture<SimpleTextCustomFieldValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleTextCustomFieldValueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleTextCustomFieldValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
