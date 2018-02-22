import { Component, OnInit } from '@angular/core';
import {ElectionService} from '../../services/election.service';
import {LocalStorageService} from 'angular-2-local-storage';
import {BallotService} from '../../services/ballot.service';
import {Observable} from 'rxjs/Observable';
import {BallotModel} from '../../models/ballot-model';
import {ElectorModel} from '../../models/elector-model';
import {ElectorateService} from '../../services/electorate.service';

@Component({
  selector: 'app-ballot',
  templateUrl: './ballot.component.html',
  styleUrls: ['./ballot.component.css']
})
export class BallotComponent implements OnInit {

  election: Observable<{name: string, description: string}>;

  ballots: Observable<BallotModel[]>;

  election_id: string;

  /**
   * rxjs Observable with Elector Data
   * @var Observable<ElectorModel>
   */
  elector$: Observable<ElectorModel>;

  constructor(
    private electionService: ElectionService,
    private localStorage: LocalStorageService,
    private ballotService: BallotService,
    private electorService: ElectorateService
  ) { }

  ngOnInit() {
    this.election_id = this.localStorage.get('election');
    this.retrieveBallots();
    this.retrieveElection();
    this.getElector();
  }

  private retrieveElection() {
    const election_id: string = this.localStorage.get('election');
    this.election = this.electionService.getDocument(election_id)
      .map(data => {
        return {
          name: data.name,
          description: data.description
        };
      });
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
            candidates: ballots[i].payload.doc.data().candidates,
          };
        }
        return formatted;
      });
  }

  private getElector() {
    const elector_id: string = this.localStorage.get('elector');
    this.elector$ = this.electorService.getElector(this.election_id, elector_id)
      .map(data => {
        return {
          id: elector_id,
          locked: data.locked,
          votes: data.votes
        };
      });
  }

  lockBallot(elector: ElectorModel) {
    this.electorService.lockBallot(this.election_id, elector);
  }
}
