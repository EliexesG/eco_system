import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { ShareModule } from './share/share.module';
import { HomeModule } from './home/home.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CentroAcopioModule } from './centro-acopio/centro-acopio.module';
import { MaterialModule } from './material/material.module';
import { ToastrModule } from 'ngx-toastr';
import { CuponModule } from './cupon/cupon.module';
import { CanjeoMaterialesModule } from './canjeo-materiales/canjeo-materiales.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { UsuarioModule } from './usuario/usuario.module';
import { HttpErrorInterceptorService } from './share/services/http-error-interceptor.service';
import { GraficosModule } from './graficos/graficos.module';
import { CanjeoCuponesModule } from './canjeo-cupones/canjeo-cupones.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    BrowserAnimationsModule,
    CoreModule,
    ShareModule,
    HomeModule,
    CentroAcopioModule,
    CanjeoCuponesModule,
    MaterialModule,
    CuponModule,
    UsuarioModule,
    CanjeoMaterialesModule,
    GraficosModule,
    AppRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
