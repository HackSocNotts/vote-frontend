import { Component, OnInit, Input } from '@angular/core';
import {BallotModel} from '../../models/ballot-model';

@Component({
  selector: 'app-basic-ballot',
  templateUrl: './basic-ballot.component.html',
  styleUrls: ['./basic-ballot.component.css']
})
export class BasicBallotComponent implements OnInit {

  @Input() ballot: BallotModel;

  constructor() { }

  ngOnInit() {
  }

}
