import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import { Observable } from 'rxjs/Observable';

import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AngularFire } from 'angularfire2';

@Injectable()
export class AuthGuard implements CanActivate{
  public allowed: boolean;

  constructor(private af: AngularFire, private router: Router) {

    this.af.auth.map(auth => {
      console.log('haai');
      return this.checkStatus(auth);
    });

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.af.auth.map((auth) =>  {
      return this.checkStatus(auth);
    }).take(1)
  }

  checkStatus(auth: any){
    console.log("AuthGuard ", " checkStatus: ", auth);
    if(auth == null) {
      this.router.navigate(['/login']);
      return false;
    } else {
      return true;
    }
  }
}
