import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSondaggiComponent } from './add-sondaggi.component';

describe('AddSondaggiComponent', () => {
  let component: AddSondaggiComponent;
  let fixture: ComponentFixture<AddSondaggiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSondaggiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSondaggiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
