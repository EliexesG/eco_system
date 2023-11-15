import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FireBaseStorageService {

  rootPath: string = 'Imagenes';

  constructor(private storage: AngularFireStorage) {}

  uploadArchivoImagen(nombreImagen: string, datos: any, path: string): AngularFireUploadTask {
    return this.storage.upload(`${this.rootPath}/${path}/${nombreImagen}`, datos);
  }

  deleteArchivoImagen(url:string): Observable<any> {
    return this.storage.refFromURL(url).delete();
  }

  getURLArchivoImagen(nombreImagen: string, path: string): Observable<string> {
    return this.storage.ref(`${this.rootPath}/${path}/${nombreImagen}`).getDownloadURL();
  }

  getFile(url:string): Observable<any> {
    return this.storage.refFromURL(url).getMetadata();
  }
}
