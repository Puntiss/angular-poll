import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificaSondaggioComponent } from './modifica-sondaggio.component';

describe('ModificaSondaggioComponent', () => {
  let component: ModificaSondaggioComponent;
  let fixture: ComponentFixture<ModificaSondaggioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificaSondaggioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificaSondaggioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
