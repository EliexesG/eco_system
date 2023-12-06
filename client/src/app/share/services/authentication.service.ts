import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
//npm install jwt-decode
//npm audit fix --force

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  ServerUrl = environment.baseUrl;
  private tokenUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  private authenticated = new BehaviorSubject<boolean>(false);
  private user = new BehaviorSubject<any>(null);
  private tipo = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient, private router: Router) {
    this.tokenUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.tokenUserSubject.asObservable();
  }

  public get tokenUserValue(): any {
    return this.tokenUserSubject.value;
  }

  get getTipo(): any{
    return this.tipo.value;
  }

  get isAuthenticated(): Observable<any> {
    if (this.tokenUserValue != null) {
      this.authenticated.next(true);
    } else {
      this.authenticated.next(false);
    }
    return this.authenticated.asObservable();
  }

  createUser(user: any): Observable<any> {
    return this.http.post<any>(this.ServerUrl + 'usuario', user);
  }

  get decodeToken(): Observable<any> {
    this.user.next(null);
    if (this.tokenUserValue != null) {
      this.user.next(jwtDecode(this.tokenUserValue));
    }

    return this.user.asObservable();
  }

  loginUser(user: any): Observable<any> {
    return this.http.post<any>(this.ServerUrl + 'usuario/login', user).pipe(
      map((response) => {
        localStorage.setItem('tipo', JSON.stringify(user.tipoUsuario))
        localStorage.setItem('currentUser', JSON.stringify(response.token));
        this.authenticated.next(true);
        this.tokenUserSubject.next(response.token);
        let userData = this.decodeToken;
        return userData;
      })
    );
  }

  logout() {
    let usuario = this.tokenUserSubject.value;
    if (usuario) {
      
      localStorage.removeItem('tipo')
      localStorage.removeItem('currentUser');
      this.tokenUserSubject.next(null);
      this.authenticated.next(false);
      return true;
    }
    return false;
  }
}
