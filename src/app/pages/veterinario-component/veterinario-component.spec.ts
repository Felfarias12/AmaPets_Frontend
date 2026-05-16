import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeterinarioComponent } from './veterinario-component';

describe('VeterinarioComponent', () => {
  let component: VeterinarioComponent;
  let fixture: ComponentFixture<VeterinarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VeterinarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VeterinarioComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
