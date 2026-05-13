import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaClinicaComponent } from './ficha-clinica-component';

describe('FichaClinicaComponent', () => {
  let component: FichaClinicaComponent;
  let fixture: ComponentFixture<FichaClinicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FichaClinicaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FichaClinicaComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
