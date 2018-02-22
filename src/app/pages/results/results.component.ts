import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {LocalStorageService} from 'angular-2-local-storage';
import {ElectionService} from '../../services/election.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  election_id: string;

  election$: Observable<any>;

  constructor(
    private localStroage: LocalStorageService,
    private electionService: ElectionService
  ) { }

  ngOnInit() {
    this.election_id = this.localStroage.get('election');
    this.retrieveElection();
  }

  private retrieveElection() {
    this.election$ = this.electionService.getDocument(this.election_id)
      .pipe(
        map(data => {
          return {
            id: this.election_id,
            name: data.name,
            description: data.description,
            locked: (data.locked) ? data.locked : false
          };
        })
      );
  }

}
