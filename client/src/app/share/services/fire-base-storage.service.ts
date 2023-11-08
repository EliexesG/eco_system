import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FireBaseStorageService {
  constructor(private storage: AngularFireStorage) {}

  uploadArchivoImagen(nombreImagen: string, datos: any): AngularFireUploadTask {
    return this.storage.upload(nombreImagen, datos);
  }

  deleteArchivoImagen(nombreImagen: string): Observable<any> {
    return this.storage.ref(nombreImagen).delete();
  }

  updateArchivoImagen(nombreImagen: string, datos: any): Observable<any> {
    return this.storage.ref(nombreImagen).updateMetadata(datos);
  }

  getURLArchivoImagen(nombreImagen: string): Observable<string> {
    return this.storage.ref(nombreImagen).getDownloadURL();
  }
}
