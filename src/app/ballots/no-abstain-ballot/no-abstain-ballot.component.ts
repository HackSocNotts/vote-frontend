import {Component, Input, OnInit} from '@angular/core';
import {BallotModel} from '../../models/ballot-model';

@Component({
  selector: 'app-no-abstain-ballot',
  templateUrl: './no-abstain-ballot.component.html',
  styleUrls: ['./no-abstain-ballot.component.css']
})
export class NoAbstainBallotComponent implements OnInit {

  @Input() ballot: BallotModel;

  constructor() { }

  ngOnInit() {
  }

}
