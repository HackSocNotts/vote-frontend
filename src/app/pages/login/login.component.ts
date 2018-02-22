import { Component, OnInit, NgZone } from '@angular/core';
import { AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { ElectionService } from '../../services/election.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    public afAuth: AngularFireAuth,
    private election: ElectionService,
    private router: Router,
    private localStorage: LocalStorageService,
    private zone: NgZone
  ) { }

  ngOnInit() {
  }

  login(method: string) {

    let loginData;

    if (method === 'google') {
      loginData = this.googleLogin();
    } else if (method === 'facebook') {
      loginData = this.facebookLogin();
    } else if (method === 'github') {
      loginData = this.githubLogin();
    } else {
      return false;
    }

    loginData.then((credential) => {
      this.checkForElection(credential.user.uid);
    });
  }

  checkForElection(user: string) {
    const result = this.election.searchForUser(user);
    result.subscribe(data => {
      this.zone.run(() => {
        if (data.length === 0) {
          this.router.navigateByUrl('create');
        } else {
          const electionID = data[0].payload.doc.id;
          this.localStorage.set('election', electionID);
          this.router.navigateByUrl('dashboard');
        }
      });
    });
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.oAuthLogin(provider);
  }

  githubLogin() {
    const provider = new firebase.auth.GithubAuthProvider();
    return this.oAuthLogin(provider);
  }

  oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider);
  }

}
