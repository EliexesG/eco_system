import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioContrasennaComponent } from './usuario-contrasenna.component';

describe('UsuarioContrasennaComponent', () => {
  let component: UsuarioContrasennaComponent;
  let fixture: ComponentFixture<UsuarioContrasennaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsuarioContrasennaComponent]
    });
    fixture = TestBed.createComponent(UsuarioContrasennaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
