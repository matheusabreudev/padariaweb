import { NotificationType } from './../enum/notification-type.enum';
import { AuthenticationService } from './../service/authentication.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NotificationService } from '../service/notification.service';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  
  constructor(private authenticationService: AuthenticationService, private router: Router, private notificationService: NotificationService){}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      return this.isUserLoggedIn();
  }

  private isUserLoggedIn(): boolean{
    if(this.authenticationService.isLoggedIn()){
      return true;
    }
    this.router.navigate(['/login']);
    this.notificationService.notify(NotificationType.ERROR, `Você precisa estar logado para acessar essa página!`);
    return false;
  }
  
}
