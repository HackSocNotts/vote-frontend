import { Component, OnInit, Input } from '@angular/core';
import {BallotModel} from '../../models/ballot-model';
import {ElectorModel} from '../../models/elector-model';
import {Observable} from 'rxjs/Observable';
import {LocalStorageService} from 'angular-2-local-storage';
import {ElectorateService} from '../../services/electorate.service';

@Component({
  selector: 'app-basic-ballot',
  templateUrl: './basic-ballot.component.html',
  styleUrls: ['./basic-ballot.component.css']
})
export class BasicBallotComponent implements OnInit {

  /**
   * Election ID
   * @var string
   */
  election: string;

  /**
   * rxjs Observable with Elector Data
   * @var Observable<ElectorModel>
   */
  elector$: Observable<ElectorModel>;

  /**
   * Elector ID
   * @var string
   */
  elector_id: string;

  /**
   * The ballot data
   * @var BallotModel
   */
  @Input() ballot: BallotModel;

  constructor(
    private localStorage: LocalStorageService,
    private electorService: ElectorateService
  ) { }

  ngOnInit() {
    this.election = this.localStorage.get('election');
    this.getElector();
  }

  private getElector() {
    this.elector_id = this.localStorage.get('elector');
    this.elector$ = this.electorService.getElector(this.election, this.elector_id)
      .map(data => {
        const elector = {
          id: this.elector_id,
          locked: data.locked,
          assigned: data.assigned,
          votes: data.votes
        };
        this.checkForBallot(elector);
        return elector;
      });
  }

  checkForBallot(original: ElectorModel) {
    if (original.votes[this.ballot.id] === undefined) {
      this.electorService.addBasicBallot(this.election, original, this.ballot.id);
    }
  }

  hasVoted(status: number) {
    return !isNaN(status);
  }

  favor (elector: ElectorModel) {
    this.electorService.castBasicVote(this.election, elector, this.ballot.id, 3);
  }
  abstain (elector: ElectorModel) {
    this.electorService.castBasicVote(this.election, elector, this.ballot.id, 2);
  }
  against (elector: ElectorModel) {
    this.electorService.castBasicVote(this.election, elector, this.ballot.id, 1);
  }
  reset (elector: ElectorModel) {
    this.electorService.castBasicVote(this.election, elector, this.ballot.id, NaN);
  }
}
