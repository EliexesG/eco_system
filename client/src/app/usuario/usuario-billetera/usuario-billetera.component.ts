import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/share/services/authentication.service';
import { GenericService } from 'src/app/share/services/generic.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-usuario-billetera',
  templateUrl: './usuario-billetera.component.html',
  styleUrls: ['./usuario-billetera.component.css'],
})
export class UsuarioBilleteraComponent implements OnInit {
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  currentUser: any;

  constructor(
    private dialogRef: MatDialogRef<UsuarioBilleteraComponent>,
    private gService: GenericService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.authService.decodeToken.subscribe(
      (user: any) => (this.currentUser = user)
    );

    this.loadBilletera();
  }

  loadBilletera() {
    if (this.currentUser) {
      this.gService
        .get('usuario', this.currentUser.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe((usuario: any) => {
          this.datos = usuario.billetera;
          this.datos.recibidos = parseInt(this.datos.disponibles) + parseInt(this.datos.canjeados);
        });
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onClose() {
    this.dialogRef.close();
  }
}
