import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ElectorModel} from '../../../models/elector-model';
import {ElectorateService} from '../../../services/electorate.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-recieved-votes',
  templateUrl: './recieved-votes.component.html',
  styleUrls: ['./recieved-votes.component.css']
})
export class ReceivedVotesComponent implements OnInit {

  @Input() election: {
    id: string,
    name: string,
    description: string,
    locked: boolean
  };

  electorate$: Observable<ElectorModel[]>;

  constructor(
    private electorService: ElectorateService
  ) { }

  ngOnInit() {
    this.retrieveElectorate();
  }

  private retrieveElectorate() {
    this.electorate$ = this.electorService.getElectorate(this.election.id)
      .pipe(
        map(data => {
          const formatted = [];
          for (let i = 0; i < data.length; i++) {
            formatted[i] = {
              id : data[i].payload.doc.id,
              locked: data[i].payload.doc.data().locked,
              votes: data[i].payload.doc.data().votes
            };
          }
          return formatted;
        })
      );
  }

}
