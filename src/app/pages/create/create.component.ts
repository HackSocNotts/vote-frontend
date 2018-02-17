import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
    this.progress = 33;
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
  //  Firebase check code
    if (this.electionCode.length !== 5) {
      this.error = 'ID must be 5 characters long';
    } else if (!this.isAlphaNumeric(this.electionCode)) {
      this.error = 'ID must be alphanumeric';
    } else {
      this.error = '';
    }
  }

  isAlphaNumeric(ch) {
    return ch.match(/^[a-z0-9]+$/i) !== null;
  }
}
