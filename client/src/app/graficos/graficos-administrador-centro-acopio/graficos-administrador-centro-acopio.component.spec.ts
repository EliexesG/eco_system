import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficosAdministradorCentroAcopioComponent } from './graficos-administrador-centro-acopio.component';

describe('GraficosAdministradorCentroAcopioComponent', () => {
  let component: GraficosAdministradorCentroAcopioComponent;
  let fixture: ComponentFixture<GraficosAdministradorCentroAcopioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraficosAdministradorCentroAcopioComponent]
    });
    fixture = TestBed.createComponent(GraficosAdministradorCentroAcopioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
