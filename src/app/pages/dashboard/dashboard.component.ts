import {Component, OnInit, ViewChild} from '@angular/core';
import {LocalStorageService} from 'angular-2-local-storage';
import {ElectionService} from '../../services/election.service';
import {BallotService} from '../../services/ballot.service';
import {SuiModalService, TemplateModalConfig, ModalTemplate} from 'ng2-semantic-ui';
import {BallotModel} from '../../models/ballot-model';
import {Router} from '@angular/router';
import {ElectorateService} from '../../services/electorate.service';

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
   * Modal for adding codes
   */
  @ViewChild('addCodesModal')
  public addCodesModal: ModalTemplate<any, any, any>;

  /**
   * Object containing election information
   */
  election: any;

  /**
   * Object containing information about ballots
   */
  ballots: any;

  /**
   * Object container array of electorate details
   */
  electorateCodes: any;

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
  newBallotType: number;

  /**
   * Number of codes for electorate.
   *
   * Linked ot NgModel for codes in add codes modal
   */
  newCodesCount: number;

  constructor(
    private localStorage: LocalStorageService,
    private electionService: ElectionService,
    private ballotService: BallotService,
    public modalService: SuiModalService,
    private router: Router,
    private electorate: ElectorateService
  ) { }

  ngOnInit() {
    const election_id: string = this.localStorage.get('election');
    this.electionService.getDocument(election_id)
      .subscribe(data => {
        this.election = data;
        this.election.id = election_id;
        this.retrieveBallots();
        this.retrieveCodes();
      });
  }

  private retrieveCodes() {
    const election_id = this.election.id;
    this.electorate.getElectorate(election_id)
      .subscribe(data => {
        const codes = [];
        for (let i = 0; i < data.length; i++) {
         const elector = data[i];
         codes[i] = {
           id: elector.payload.doc.id
         };
        }
        this.electorateCodes = codes;
        console.log(this.electorateCodes);
      });
  }

  private retrieveBallots() {
    const election_id = this.election.id;
    this.ballotService.getBallots(election_id)
      .subscribe(data => {
        const ballots = [];
        for (let i = 0; i < data.length; i++) {
          const ballot = data[i];
          ballots[i] = {
            id: ballot.payload.doc.id,
            name: ballot.payload.doc.data().name,
            description: ballot.payload.doc.data().description,
            type: ballot.payload.doc.data().type,
            options: ballot.payload.doc.data().options
          };
        }
        this.ballots = ballots;
        console.log(this.ballots);
      });
  }

  viewBallot(uid: string) {
    const ballot = this.ballots.filter(data => data.id === uid)[0];
    console.log(ballot);
    const config = new TemplateModalConfig<BallotModel, any, any>(this.ballotModalTemplate);
    config.context = {
      id: ballot.id,
      name: ballot.name,
      description: ballot.description,
      type: ballot.type,
      options: ballot.options
    };

    this.modalService
      .open(config);
  }

  deleteBallot(uid: string) {
    this.ballotService.deleteBallot(this.election.id, uid);
  }

  addBallot() {
    const config = new TemplateModalConfig<any, any, any>(this.addBallotModalTemplate);
    this.modalService.open(config);
  }

  addNewBallot() {
    const data = {
      name: this.newBallotName,
      description: this.newBallotDescription,
      type: this.newBallotType
    };
    this.ballotService.addBallot(this.election.id, data);
    this.newBallotName = '';
    this.newBallotDescription = '';
    this.newBallotType = 0;
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

}
