import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroService } from './registro-service';

describe('RegistroService', () => {
  let component: RegistroService;
  let fixture: ComponentFixture<RegistroService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroService],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroService);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
