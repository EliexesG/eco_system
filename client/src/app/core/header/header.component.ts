import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CanjeoMaterialesCartComponent } from 'src/app/canjeo-materiales/canjeo-materiales-cart/canjeo-materiales-cart.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  homeClick = () => {
    this.router.navigate(['/'], {
      relativeTo: this.route,
    });
  };

  canjeoMaterialesClick() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.position = {top: '15px', right: '15px'}
    this.dialog.open(CanjeoMaterialesCartComponent, dialogConfig);
  }

}
