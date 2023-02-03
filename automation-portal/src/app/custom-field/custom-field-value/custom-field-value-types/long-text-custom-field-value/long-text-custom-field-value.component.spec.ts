import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LongTextCustomFieldValueComponent } from './long-text-custom-field-value.component';

describe('LongTextCustomFieldValueComponent', () => {
  let component: LongTextCustomFieldValueComponent;
  let fixture: ComponentFixture<LongTextCustomFieldValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LongTextCustomFieldValueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LongTextCustomFieldValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
