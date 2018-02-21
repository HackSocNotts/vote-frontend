import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {BallotModel} from '../../models/ballot-model';
import {CandidatesService} from '../../services/candidates.service';
import {LocalStorageService} from 'angular-2-local-storage';
import {Observable} from 'rxjs/Observable';
import {CandidateModel} from '../../models/candidate-model';
import {ModalTemplate, SuiModalService, TemplateModalConfig} from 'ng2-semantic-ui';

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
   * Modal for viewing a candidate
   */
  @ViewChild('viewCandidateModal')
  public viewCandidateModal: ModalTemplate<any, any, any>;

  constructor(
    private candidateService: CandidatesService,
    private localStorage: LocalStorageService,
    public modalService: SuiModalService,
  ) { }

  ngOnInit() {
    console.log(this.ballot);
    this.election = this.localStorage.get('election');
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

  viewCandidate(candidate: any) {
    const config = new TemplateModalConfig<any, any, any>(this.viewCandidateModal);
    config.context = candidate;
    this.modalService
      .open(config);
  }

}
