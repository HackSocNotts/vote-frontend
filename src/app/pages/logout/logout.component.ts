import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {Router} from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    private localStorage: LocalStorageService
  ) { }

  ngOnInit() {
    this.logout();
    this.router.navigateByUrl('/');
  }

  logout() {
    this.afAuth.auth.signOut();
    this.localStorage.clearAll();
  }
}
