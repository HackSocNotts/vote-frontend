import { Component, OnInit } from '@angular/core';
import {ElectionService} from '../../services/election.service';
import {LocalStorageService} from 'angular-2-local-storage';
import {BallotService} from '../../services/ballot.service';

@Component({
  selector: 'app-ballot',
  templateUrl: './ballot.component.html',
  styleUrls: ['./ballot.component.css']
})
export class BallotComponent implements OnInit {

  election: any;

  constructor(
    private electionService: ElectionService,
    private localStorage: LocalStorageService,
    private balltService: BallotService
  ) { }

  ngOnInit() {
    const election_id: string = this.localStorage.get('election');
    this.electionService.getDocument(election_id)
      .subscribe(data => {
        this.election = data;
      });
    this.balltService.getBallots(election_id)
      .subscribe(data => {
        const ballots: any[] = [];
        for (let i = 0; i < data.length; i++) {
          const ballot = data[i];
          ballots[i] = {
            id: ballot.payload.doc.id,
            name: ballot.payload.doc.data().name,
            description: ballot.payload.doc.data().description,
            type: ballot.payload.doc.data().type,
            options: ballot.payload.doc.data().options,
          };
        }
        this.election.ballots = ballots;
        console.log(this.election);
      });
  }

}
