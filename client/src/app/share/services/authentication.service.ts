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
  //Header para afirmar el tipo de contenido JSON
  //URL del API
  ServerUrl = environment.baseUrl;
  //Variable observable para gestionar la información del token del usuario, con características especiales
  private tokenUserSubject: BehaviorSubject<any>;
  //Variable observable para gestionar la información del token
  public currentUser: Observable<any>;
  //Booleano para estado de usuario autenticado
  private authenticated = new BehaviorSubject<boolean>(false);
  //Variable observable para obtener la información del usuario
  private user = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient, private router: Router) {
    //Obtener los datos del usuario en localStorage, si existe
    this.tokenUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    //Establecer un observable para acceder a los datos del usuario
    this.currentUser = this.tokenUserSubject.asObservable();
  }
  //Obtener el valor del usuario actual
  public get tokenUserValue(): any {
    return this.tokenUserSubject.value;
  }
  //Establecer booleano verificando si esta autenticado
  get isAuthenticated() {
    if (this.tokenUserValue != null) {
      this.authenticated.next(true);
    } else {
      this.authenticated.next(false);
    }
    return this.authenticated.asObservable();
  }
  //Crear usuario
  createUser(user: any): Observable<any> {
    return this.http.post<any>(this.ServerUrl + 'usuario', user);
  }
  //Decodificar la información del token y obtener la información del usuario
  get decodeToken(): Observable<any> {
    this.user.next(null);
    if (this.tokenUserValue != null) {
      this.user.next(jwtDecode(this.tokenUserValue));
    }

    return this.user.asObservable();
  }

  //Login
  loginUser(user: any): Observable<any> {
    console.log('Usuario: ' + user);
    return this.http.post<any>(this.ServerUrl + 'usuario/login', user).pipe(
      map((response) => {
        // almacene los detalles del usuario y el token jwt
        // en el almacenamiento local para mantener al usuario conectado entre las actualizaciones de la página

        let user = jwtDecode(response.token) as any;
        console.log(user);

        if (user.desabilitado) {
          throw new Error();
        }

        this.authenticated.next(true);
        this.tokenUserSubject.next(response.token);
        let userData = this.decodeToken;
        localStorage.setItem('currentUser', JSON.stringify(response.token));
        return userData;
      })
    );
  }

  cambiarContrasenna(data: any): Observable<any> {

    return this.http.post<any>(this.ServerUrl + 'usuario/cambiarcontrasenna', data).pipe(
      map((response: any) => {
        return response;
      })
    )

  }

  //Logout de usuario autentificado
  logout() {
    let usuario = this.tokenUserSubject.value;
    if (usuario) {
      // eliminar usuario del almacenamiento local para cerrar la sesión del usuario
      localStorage.removeItem('currentUser');
      //Eliminarlo del observable del usuario actual
      this.tokenUserSubject.next(null);
      //Eliminarlo del observable del boleano si esta autenticado
      this.authenticated.next(false);
      return true;
    }
    return false;
  }
}
