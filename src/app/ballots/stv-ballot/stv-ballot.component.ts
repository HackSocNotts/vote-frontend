import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {BallotModel} from '../../models/ballot-model';
import {CandidatesService} from '../../services/candidates.service';
import {LocalStorageService} from 'angular-2-local-storage';
import {Observable} from 'rxjs/Observable';
import {CandidateModel} from '../../models/candidate-model';
import {ModalTemplate, SuiModalService, TemplateModalConfig} from 'ng2-semantic-ui';
import {ElectorModel} from '../../models/elector-model';
import {ElectorateService} from '../../services/electorate.service';

@Component({
  selector: 'app-stv-ballot',
  templateUrl: './stv-ballot.component.html',
  styleUrls: ['./stv-ballot.component.css']
})
export class StvBallotComponent implements OnInit {

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

  /**
   * Observable with all candidates
   * @var Observable<CandidateModel[]>
   */
  candidates$: Observable<CandidateModel[]>;

  /**
   * Error to show if invalid input
   * @var string
   */
  error: string;

  /**
   * Modal for viewing a candidate
   */
  @ViewChild('viewCandidateModal')
  public viewCandidateModal: ModalTemplate<any, any, any>;

  constructor(
    private candidateService: CandidatesService,
    private localStorage: LocalStorageService,
    private electorService: ElectorateService,
    public modalService: SuiModalService
  ) { }

  ngOnInit() {
    this.election = this.localStorage.get('election');
    this.getElector();
    this.getCandidates();
  }

  private getCandidates() {
    this.candidates$ = this.candidateService.getCandidates(this.election)
      .map(data => {
        const formatted = [];
        for (let i = 0; i < data.length; i++) {
          if (!this.ballot.candidates.includes(data[i].payload.doc.id)) { continue; }
          formatted.push({
            id: data[i].payload.doc.id,
            name: data[i].payload.doc.data().name,
            manifesto: data[i].payload.doc.data().manifesto
          });
        }
        return formatted;
      });
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
      this.electorService.addAdvBallot(this.election, original, this.ballot.id);
    }
  }

  viewCandidate(candidate: any) {
    const config = new TemplateModalConfig<any, any, any>(this.viewCandidateModal);
    config.context = candidate;
    this.modalService
      .open(config);
  }

  updateVote(candidate: CandidateModel, original: ElectorModel, raw_vote: string) {
    const vote: number = parseInt(raw_vote, 10);
    if (raw_vote > this.ballot.candidates.length) {
      this.error = 'Rank for ' + candidate.name + ' is out of range. Must be between 1 and ' + this.ballot.candidates.length + '.';
    } else {
      this.error = '';
    }
    this.electorService.castAdvVote(this.election, original, this.ballot.id, candidate.id, vote);
  }

  showVal(data) {
    if (data !== undefined && !isNaN(data)) {
      return data;
    } else {
      return '';
    }
  }
}
