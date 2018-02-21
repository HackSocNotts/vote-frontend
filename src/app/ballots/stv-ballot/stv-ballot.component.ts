import {Component, Input, OnInit} from '@angular/core';
import {BallotModel} from '../../models/ballot-model';
import {CandidatesService} from '../../services/candidates.service';
import {LocalStorageService} from 'angular-2-local-storage';
import {Observable} from 'rxjs/Observable';
import {CandidateModel} from '../../models/candidate-model';

@Component({
  selector: 'app-stv-ballot',
  templateUrl: './stv-ballot.component.html',
  styleUrls: ['./stv-ballot.component.css']
})
export class StvBallotComponent implements OnInit {

  election: string;

  @Input() ballot: BallotModel;

  candidates$: Observable<CandidateModel[]>;

  constructor(
    private candidateService: CandidatesService,
    private localStorage: LocalStorageService
  ) { }

  ngOnInit() {
    console.log(this.ballot);
    this.election = this.localStorage.get('election');
    this.getCandidates();
  }

  getCandidates() {
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

}
