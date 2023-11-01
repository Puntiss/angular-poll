import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRegistraComponent } from './form-registra.component';

describe('FormRegistraComponent', () => {
  let component: FormRegistraComponent;
  let fixture: ComponentFixture<FormRegistraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormRegistraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRegistraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
