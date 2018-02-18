import { Component, OnInit } from '@angular/core';
import { ElectionService } from '../../services/election.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  progress: number;

  electionName: string;

  description: string;

  electionCode: string;

  error: string;

  showAdd = true;
  showDescription = false;
  showCode = false;
  showReview = false;

  constructor(
    private election: ElectionService,
    private auth: AngularFireAuth,
    private localStorage: LocalStorageService
  ) { }

  ngOnInit() {
    this.progress = 33;
    this.showAdd = true;
  }

  canContinue() {
    if (this.error === '') {
      return true;
    }
    return false;
  }

  toAdd() {
    if (this.canContinue()) {
      this.progress = 33;
      this.showAdd = true;
      this.showDescription = false;
      this.showCode = false;
      this.showReview = false;
    }
  }

  toDescription() {
    if (this.canContinue()) {
      this.progress = 50;
      this.showAdd = false;
      this.showDescription = true;
      this.showCode = false;
      this.showReview = false;
    }
  }

  toCode() {
    if (this.canContinue()) {
      this.progress = 68;
      this.showAdd = false;
      this.showDescription = false;
      this.showCode = true;
      this.showReview = false;
    }
  }

  toReview() {
    if (this.canContinue()) {
      this.progress = 80;
      this.showAdd = false;
      this.showDescription = false;
      this.showCode = false;
      this.showReview = true;
    }
  }

  checkName() {
    if (this.electionName.length < 3) {
      this.error = 'Please enter an election name.';
    } else {
      this.error = '';
    }
  }

  checkDescription() {
    if (this.description.length < 3) {
      this.error = 'Please enter a valid description.';
    } else {
      this.error = '';
    }
  }

  checkCode() {
    if (this.electionCode.length !== 5) {
      this.error = 'ID must be 5 characters long';
    } else if (!this.isAlphaNumeric(this.electionCode)) {
      this.error = 'ID must be alphanumeric';
    } else {
      this.election.getDocument(this.electionCode).subscribe((data) => {
        if (data) {
          this.error = 'Code already exists';
        } else {
          this.error = '';
        }
      });
    }
  }

  addElection() {
    this.checkName(); this.checkDescription(); this.checkCode();
    if (!this.canContinue()) {
      this.toAdd();
    }

    this.auth.authState.subscribe(authState => {
      const user_id = authState.uid;
      const newDocument = this.election.addElection(this.electionCode, this.electionName, this.description, user_id);
      newDocument.then(data => {
        this.localStorage.set('election', this.electionCode);
      }).catch(err => {
        console.error(err);
      });
    });
  }

  isAlphaNumeric(ch) {
    return ch.match(/^[a-z0-9]+$/i) !== null;
  }
}
