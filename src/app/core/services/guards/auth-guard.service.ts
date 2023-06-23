import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree
} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {AuthService} from '../authentification/auth.service';
import {TokenStorageService} from '../authentification/token-storage.service';
import {Observable} from 'rxjs';
import Auth from '@aws-amplify/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild, CanLoad {

  // tslint:disable-next-line:max-line-length
  constructor(public jwtHelper: JwtHelperService,
              public auth: AuthService,
              public router: Router,
              public tokenStorage: TokenStorageService) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {


    // const token = this.tokenStorage.getToken();
    // const expectedRole = next.data.expectedRole as string;
    //
    // if (this.jwtHelper.isTokenExpired(token)) {
    //   this.tokenStorage.signOut();
    //   this.router.navigate(['/']);
    //
    //   return false;
    // }
    //
    //
    //
    // if ( 'ROLE_' + expectedRole !==  this.jwtHelper.decodeToken(this.tokenStorage.getToken()).role[0] ) {
    //   this.tokenStorage.signOut();
    //   this.router.navigate(['/']);
    //
    //   return false;
    // }

    return true;
  }


  // tslint:disable-next-line:max-line-length
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    const token = this.tokenStorage.getToken();
    const expectedRole = childRoute.parent.data.expectedRole as string;
  console.log(expectedRole)


  if (!expectedRole.includes(this.tokenStorage.getAuthorities())  ) {
    this.tokenStorage.signOut();
    this.router.navigate(['/']);
    console.log("PERMISSION DENIED ")
    return false;
  }


    return true;
  }


  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

    return new Promise((resolve) => {
      fetch('../../../config/config.json').then(res => {
        res.json().then((res) => {
          Auth.configure(res.amplify.Auth);
        }).then(() => {

          Auth.currentAuthenticatedUser()
            .then((user) => {
              resolve(true);

            })
            .catch((err) => {
              console.log(err);
              this.router.navigate(['/']);
              resolve(false);
            }) ;  }) .catch((e) => console.log(e));
      }); });


    // return new Promise((resolve) => {
    //   Auth.currentAuthenticatedUser({
    //     bypassCache: false
    //   })
    //     .then((user) => {
    //       if (user) {
    //         resolve(true);
    //       }
    //
    //       console.log(user)
    //
    //     })
    //     .catch(() => {
    //       this.router.navigate(['/']);
    //       this.tokenStorage.signOut();
    //       resolve(false);
    //     });
    // });

  }

}
