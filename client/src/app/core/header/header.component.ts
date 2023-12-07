import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CanjeoMaterialesCartComponent } from 'src/app/canjeo-materiales/canjeo-materiales-cart/canjeo-materiales-cart.component';
import { UsuarioDiagComponent } from 'src/app/usuario/usuario-diag/usuario-diag.component';
import { AuthenticationService } from 'src/app/share/services/authentication.service';
import { UsuarioContrasennaComponent } from 'src/app/usuario/usuario-contrasenna/usuario-contrasenna.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isAutenticated: boolean;
  currentUser: any;
  tipo: any = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private authService: AuthenticationService
  ) {}

  homeClick = () => {
    this.router.navigate(['/'], {
      relativeTo: this.route,
    });
  };

  ngOnInit(): void {
    this.authService.decodeToken.subscribe(
      (user: any) => (this.currentUser = user)
    );
    this.authService.isAuthenticated.subscribe(
      (valor) => (this.isAutenticated = valor)
    );

    if(this.isAutenticated) {
      this.tipo = this.currentUser.tipoUsuario;
    }
  }

  canjeoMaterialesClick() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.position = { top: '15px', right: '15px' };
    this.dialog.open(CanjeoMaterialesCartComponent, dialogConfig);
  }

  onCambiarContrasenna() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    this.dialog.open(UsuarioContrasennaComponent, dialogConfig);
  }

  inicioSesion() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    this.dialog.open(UsuarioDiagComponent, dialogConfig);
  }

  logout() {
    this.authService.logout();
    this.homeClick();
    window.location.reload();
  }
}