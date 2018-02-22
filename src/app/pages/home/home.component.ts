import { Component, OnInit } from '@angular/core';
import {ElectionService} from '../../services/election.service';
import { LocalStorageService } from 'angular-2-local-storage';
import {Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  code: string[14];

  election: string[5];

  elector: string[8];

  error: string;

  errorMessage: string;

  electionObject: any;

  electorObject: any;

  validCode = false;

  constructor(
    private electionService: ElectionService,
    private localStorage: LocalStorageService,
    private router: Router,
    private afAuth: AngularFireAuth
  ) { }

  ngOnInit() {
    this.election = this.localStorage.get('election');
    this.elector = this.localStorage.get('elector');
    if (this.election && this.elector) {
      this.code = this.election + '-' + this.elector;
      this.checkCode();
    }
  }

  showInvalidCodeError(message: string) {
    this.error = 'Invalid Code';
    this.errorMessage = message;
    this.validCode = false;
    console.log(this.error);
  }

  checkCode() {
    this.error = '';
    this.validCode = true;
    if (this.code.length < 14) {
      this.validCode = false;
    }

    if (this.code.length >= 5) {
      const split = this.code.split('-');
      if (split.length > 2) {
        this.showInvalidCodeError('Code has too many parts.');
      }

      if (split[0] !== this.election) {
        this.election = split[0];
        this.electionService.getDocument(this.election)
          .subscribe(data => {
            if (data === null) {
              this.showInvalidCodeError('No election exists for this code.');
              this.electionObject = null;
            } else {
              this.electionObject = data;
            }
          });
      }
    }

    if (this.code.length === 14) {
      const split = this.code.split('-');
      if (split[1] !== this.elector) {
        this.elector = split[1];
        this.electionService.getDocument(this.election + '/electorate/' + this.elector)
          .subscribe(data => {
            if (data === null) {
              this.showInvalidCodeError('Code does not exist.');
              this.electorObject = null;
            } else {
              this.electorObject = data;
              this.validCode = true;
            }
          });
      }
    }

    if (this.code.length > 14) {
      this.showInvalidCodeError('Code is too long');
    }
  }

  continue () {
    if(this.validCode) {
      this.localStorage.set('election', this.election);
      this.localStorage.set('elector', this.elector);
      this.afAuth.auth.signInAnonymously()
        .then(() => this.router.navigateByUrl('/ballot'))
        .catch(() => this.showInvalidCodeError('Something went wrong... Please try again.'));
    } else {
      this.showInvalidCodeError('Code must be valid before continuing.');
    }
  }
}
