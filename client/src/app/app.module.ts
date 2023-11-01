import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { ShareModule } from './share/share.module';
import { HomeModule } from './home/home.module';
import { HttpClientModule } from '@angular/common/http';
import { CentroAcopioModule } from './centro-acopio/centro-acopio.module';
import { MaterialModule } from './material/material.module';
import { ToastrModule } from 'ngx-toastr';
import { CuponModule } from './cupon/cupon.module';

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
    MaterialModule,    
    CuponModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
