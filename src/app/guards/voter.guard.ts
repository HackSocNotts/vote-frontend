import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { LocalStorageService } from 'angular-2-local-storage';
import { Router } from '@angular/router';

@Injectable()
export class VoterGuard implements CanActivate {

  private authState = null;

  constructor(
    private af: AngularFireAuth,
    private localStorage: LocalStorageService,
    private router: Router
  ) {
    this.authState = this.af.authState.subscribe((auth) => {
      this.authState = auth;
    });
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const electionId: string = this.localStorage.get('election');
    const electorId: string = this.localStorage.get('elector');

    if (!electorId || !electionId) {
      this.router.navigate(['/']);
      return false;
    } else if (this.authState.isAnonymous === false) {
      this.router.navigate(['/dashboard']);
      return false;
    } else if (this.authState.isAnonymous === true && electionId && electionId) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }

  }
}
