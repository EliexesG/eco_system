import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { NotificacionService, TipoMessage } from './notification.service';
import { inject } from '@angular/core';

export class UserGuard {
  authService: AuthenticationService = inject(AuthenticationService);
  router: Router = inject(Router);
  noti: NotificacionService = inject(NotificacionService);
  auth: boolean = false;
  currentUser: any;
  
  constructor() {
    //Subscripción a la información del usuario actual
    this.authService.decodeToken.subscribe((user) => (this.currentUser = user));
    //Subscripción al boolean que indica si esta autenticado
    this.authService.isAuthenticated.subscribe((valor) => (this.auth = valor));
  }

  checkUserLogin(route: ActivatedRouteSnapshot): boolean {
    if (this.auth) {
      const usuarioTipo = this.currentUser.tipoUsuario;
      //roles.length && roles.indexOf(verify.role)===-1
      if (
        route.data['tipoUsuario'].length &&
        !route.data['tipoUsuario'].includes(usuarioTipo)
      ) {
        this.noti.mensajeRedirect(
          'Usuario',
          `Usuario Sin permisos para acceder`,
          TipoMessage.warning,
          '/usuario/login'
        );
        this.router.navigate(['/usuario/login']);
        return false;
      }
      return true;
    }
    this.noti.mensajeRedirect(
      'Usuario',
      `Usuario No autenticado`,
      TipoMessage.warning,
      '/usuario/login'
    );
    return false;
  }
}

export const authGuard: CanActivateFn = (route, state) => {
  let userGuard = new UserGuard();
  return userGuard.checkUserLogin(route);
};
