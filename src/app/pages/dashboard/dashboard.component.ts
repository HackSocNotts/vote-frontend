import {Component, OnInit, ViewChild} from '@angular/core';
import {LocalStorageService} from 'angular-2-local-storage';
import {ElectionService} from '../../services/election.service';
import {BallotService} from '../../services/ballot.service';
import {SuiModalService, TemplateModalConfig, ModalTemplate} from 'ng2-semantic-ui';
import {BallotModel} from '../../models/ballot-model';
import {Router} from '@angular/router';
import {ElectorateService} from '../../services/electorate.service';
import {CandidatesService} from '../../services/candidates.service';
import {Observable} from 'rxjs/Observable';
import {CandidateModel} from '../../models/candidate-model';
import {ElectorModel} from '../../models/elector-model';
import {tap, map} from 'rxjs/operators';
import {Modal} from 'ng2-semantic-ui/dist';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  /**
   * Modal for viewing information about a Ballot
   */
  @ViewChild('ballotModalTemplate')
  public ballotModalTemplate: ModalTemplate<BallotModel, any, any>;

  /**
   * Modal for adding a ballot
   */
  @ViewChild('addBallotModalTemplate')
  public addBallotModalTemplate: ModalTemplate<any, any, any>;

  /**
   * Name of new ballot.
   *
   * Linked ot NgModel for name in add ballot modal
   */
  newBallotName: string;

  /**
   * Description of new ballot.
   *
   * Linked ot NgModel for description in add ballot modal
   */
  newBallotDescription: string;

  /**
   * Type of new ballot.
   *
   * Linked ot NgModel for description in add ballot modal
   */
  newBallotType: string;

  /**
   * Modal for adding codes
   */
  @ViewChild('addCodesModal')
  public addCodesModal: ModalTemplate<any, any, any>;

  /**
   * Number of codes for electorate.
   *
   * Linked ot NgModel for codes in add codes modal
   */
  newCodesCount: number;

  /**
   * Modal for adding a candidate
   */
  @ViewChild('addCandidateModal')
  public addCandidateModal: ModalTemplate<any, any, any>;

  /**
   * Modal for viewing a candidate
   */
  @ViewChild('viewCandidateModal')
  public viewCandidateModal: ModalTemplate<any, any, any>;

  /**
   * Name of new candidate
   *
   * Linked ot NgModel for candidate name in add new candidate modal
   */
  newCandidateName: string;

  /**
   * Manifesto of new candidate
   *
   * Linked ot NgModel for candidate manifesto in add new candidate modal
   */
  newCandidateManifesto: string;

  /**
   * Object containing election information
   */
  election: any;

  /**
   * rxjs observable with ballots
   */
  ballots: Observable<BallotModel[]>;

  /**
   * Object container array of electorate details
   */
  electorateCodes: Observable<ElectorModel[]>;

  /**
   * rxjs observable with candidates
   */
  candidates$: Observable<CandidateModel[]>;

  /**
   * Array of candidates
   * Static array for ng-templates to access
   */
  staticCandidates: CandidateModel[];

  /**
   * Error to show in modals
   */
  modalError: string;

  constructor(
    private localStorage: LocalStorageService,
    private electionService: ElectionService,
    private ballotService: BallotService,
    public modalService: SuiModalService,
    private router: Router,
    private electorate: ElectorateService,
    private candidatesService: CandidatesService
  ) { }

  ngOnInit() {
    const election_id: string = this.localStorage.get('election');
    this.electionService.getDocument(election_id)
      .subscribe(data => {
        this.election = data;
        this.election.id = election_id;
        this.retrieveBallots();
        this.retrieveCodes();
        this.retrieveCandidates();
      });
  }

  private retrieveCodes() {
    this.electorateCodes = this.electorate.getElectorate(this.election.id)
      .map(electorate => {
        const formatted = [];
        for (let i = 0; i < electorate.length; i++) {
          formatted[i] = {
            id : electorate[i].payload.doc.id,
            locked: electorate[i].payload.doc.data().locked,
            votes: electorate[i].payload.doc.data().votes
          };
        }
        return formatted;
      });
  }

  private retrieveBallots() {
    this.ballots = this.ballotService.getBallots(this.election.id)
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

  private retrieveCandidates() {
    this.candidates$ = this.candidatesService.getCandidates(this.election.id)
    .pipe(
      map(candidates => {
        const formatted = [];
        for (let i = 0; i < candidates.length; i++) {
          formatted[i] = {
            id: candidates[i].payload.doc.id,
            name: candidates[i].payload.doc.data().name,
            manifesto: candidates[i].payload.doc.data().manifesto
          };
        }
        return formatted;
      }),
      /**
       * @todo Remove the need for tap
       * THIS IS REALLY REALLY BAD
       * DON'T DO THIS
       * FIGURE OUT A BETTER WAY TO DO IT
       */
      tap(data => {
        this.staticCandidates = data;
      })
    );
  }

  viewBallot(ballot: BallotModel) {
    const config = new TemplateModalConfig<any, any, any>(this.ballotModalTemplate);
    config.context = {
      id: ballot.id,
      name: ballot.name,
      description: ballot.description,
      type: ballot.type,
      candidates: ballot.candidates
    };

    this.modalService
      .open(config);
  }

  deleteBallot(ballot: BallotModel) {
    this.ballotService.deleteBallot(this.election.id, ballot.id);
  }

  addBallot() {
    const config = new TemplateModalConfig<any, any, any>(this.addBallotModalTemplate);
    this.modalService.open(config);
  }

  addNewBallot(modal: Modal<any, any, any>) {
    const data = {
      name: this.newBallotName,
      description: this.newBallotDescription,
      type: parseInt(this.newBallotType, 10)
    };
    // Check Name
    if (!data.name) {
      this.modalError = 'Must specify a name.';
      return false;
    }
    // Check Description
    if (!data.description) {
      this.modalError = 'Must add a description.';
      return false;
    }
    // Check for valid type
    if (!data.type) {
      this.modalError = 'Must select a valid type';
      return false;
    }
    console.log(data);
    this.ballotService.addBallot(this.election.id, data);
    modal.deny('added');
    this.newBallotName = '';
    this.newBallotDescription = '';
    this.newBallotType = undefined;
    this.modalError = '';
  }

  deleteAccount() {
    this.electionService.deleteElection(this.election.id);
    this.router.navigateByUrl('/logout');
  }

  showGenerateCodes() {
    const config = new TemplateModalConfig<any, any, any>(this.addCodesModal);
    this.modalService.open(config);
  }

  generateCodes() {
    this.electorate.generate(this.newCodesCount, this.election.id);
  }

  deleteCode(uid: string) {
    this.electorate.delete(this.election.id, uid);
  }

  addCandidate() {
    this.newCandidateName = '';
    this.newCandidateManifesto = '';
    const config = new TemplateModalConfig<any, any, any>(this.addCandidateModal);
    this.modalService.open(config);
  }

  addNewCandidate() {
    this.candidatesService.addCandidate(this.election.id, {name: this.newCandidateName, manifesto: this.newCandidateManifesto});
  }

  editCandidate(uid: string, name: string) {
    const candidate = {
      name: name,
      manifesto: this.newCandidateManifesto
    };
    this.newCandidateManifesto = '';
    this.candidatesService.editCandidate(this.election.id, uid, candidate);
  }

  deleteCandidate(uid: string) {
    this.candidatesService.deleteCandidate(this.election.id, uid);
  }

  viewCandidate(candidate: any) {
    this.newCandidateManifesto = candidate.manifesto;
    const config = new TemplateModalConfig<any, any, any>(this.viewCandidateModal);
    config.context = candidate;
    this.modalService
      .open(config);
  }

  assignCandidate(candidate: CandidateModel, ballot: BallotModel) {
    this.ballotService.assignCandidate(this.election.id, ballot, candidate.id);
  }

  unAssignCandidate(candidate: CandidateModel, ballot: BallotModel) {
    this.ballotService.unAssignCandidate(this.election.id, ballot, candidate.id);
  }


  contained(needle: any, haystack: any[], ballot: BallotModel) {
    if (haystack === undefined && ballot) {
      this.ballotService.addCandidates(this.election.id, ballot);
      return false;
    }
    return haystack.includes(needle);
  }

}
