import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SceltaSondaggioComponent } from './scelta-sondaggio.component';

describe('SceltaSondaggioComponent', () => {
  let component: SceltaSondaggioComponent;
  let fixture: ComponentFixture<SceltaSondaggioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SceltaSondaggioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SceltaSondaggioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
