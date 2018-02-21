import { Component, OnInit } from '@angular/core';
import {ElectionService} from '../../services/election.service';
import {LocalStorageService} from 'angular-2-local-storage';
import {BallotService} from '../../services/ballot.service';
import {Observable} from 'rxjs/Observable';
import { tap, map } from 'rxjs/operators';
import {BallotModel} from '../../models/ballot-model';

@Component({
  selector: 'app-ballot',
  templateUrl: './ballot.component.html',
  styleUrls: ['./ballot.component.css']
})
export class BallotComponent implements OnInit {

  election: Observable<any>;

  ballots: Observable<BallotModel[]>;

  constructor(
    private electionService: ElectionService,
    private localStorage: LocalStorageService,
    private ballotService: BallotService
  ) { }

  ngOnInit() {
    this.retrieveBallots();
    this.retrieveElection();
  }

  private retrieveElection() {
    const election_id: string = this.localStorage.get('election');
    console.log('retrieve election', election_id);
    this.election = this.electionService.getDocument(election_id)
      .map(data => {
        console.log(data);
        return {
          name: data.payload.data().name,
          description: data.payload.data().description
        };
      });
    // this.election = document.pipe(
    //   tap(data => console.log(data.payload.data())),
    //   map(data => {
    //     return {
    //       name: data.payload.data().name,
    //       description: data.payload.data().description
    //     };
    //   })
    // );
  }

  private retrieveBallots() {
    const election_id: string = this.localStorage.get('election');
    this.ballots = this.ballotService.getBallots(election_id)
      .map(ballots => {
        const formatted = [];
        for (let i = 0; i < ballots.length; i++) {
          formatted[i] = {
            id: ballots[i].payload.doc.id,
            name: ballots[i].payload.doc.data().name,
            description: ballots[i].payload.doc.data().description,
            type: ballots[i].payload.doc.data().type,
            candidates: ballots[i].payload.doc.data().options,
          };
        }
        return formatted;
      });
  }
}
