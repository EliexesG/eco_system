import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficosAdministradorComponent } from './graficos-administrador.component';

describe('GraficosAdministradorComponent', () => {
  let component: GraficosAdministradorComponent;
  let fixture: ComponentFixture<GraficosAdministradorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraficosAdministradorComponent]
    });
    fixture = TestBed.createComponent(GraficosAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
