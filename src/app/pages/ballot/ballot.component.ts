import { Component, OnInit } from '@angular/core';
import {ElectionService} from '../../services/election.service';
import {LocalStorageService} from 'angular-2-local-storage';

@Component({
  selector: 'app-ballot',
  templateUrl: './ballot.component.html',
  styleUrls: ['./ballot.component.css']
})
export class BallotComponent implements OnInit {

  election: any;

  constructor(
    private electionService: ElectionService,
    private localStorage: LocalStorageService
  ) { }

  ngOnInit() {
    this.electionService.getDocument(this.localStorage.get('election'))
      .subscribe(data => {
        this.election = data;
        console.log(this.election);
      });
  }

}
