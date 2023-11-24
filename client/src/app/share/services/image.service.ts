import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private http: HttpClient) {}

  urlAPI: string = environment.baseUrl;

  uploadImage(imageForm: FormData): Observable<any> {

    return this.http.post<any | any[]>(
      this.urlAPI + 'image/uploadimage',
      imageForm
    );
  }

  getImage(filename:any): Observable<any> {

    return this.http.post<any | any[]>(
      this.urlAPI + 'image/getimage',
      filename
    );
  }
}
