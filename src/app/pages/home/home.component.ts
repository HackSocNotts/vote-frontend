import { Component, OnInit } from '@angular/core';
import {ElectionService} from '../../services/election.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  code: string[14];

  election: string[5];

  elector: string[8];

  error; string;

  electionObject: any;

  constructor(
    private electionService: ElectionService
  ) { }

  ngOnInit() {
  }

  showInvalidCodeError() {
    this.error = 'Invalid Code';
    console.log(this.error);
  }

  checkCode() {
    this.error = '';
    if (this.code.length >= 5) {
      const split = this.code.split('-');
      if (split.length > 2) {
        this.showInvalidCodeError();
      }

      if (split[0] !== this.election) {
        this.election = split[0];
        this.electionService.getDocument(this.election)
          .subscribe(data => {
            if (data === null) {
              this.showInvalidCodeError();
              this.electionObject = null;
            } else {
              this.electionObject = data;
            }
          });
      }
    }
  }

}
