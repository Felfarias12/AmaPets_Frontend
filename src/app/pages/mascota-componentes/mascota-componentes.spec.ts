import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MascotaComponentes } from './mascota-componentes';

describe('MascotaComponentes', () => {
  let component: MascotaComponentes;
  let fixture: ComponentFixture<MascotaComponentes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MascotaComponentes],
    }).compileComponents();

    fixture = TestBed.createComponent(MascotaComponentes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
