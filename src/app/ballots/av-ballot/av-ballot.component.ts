import {Component, Input, OnInit} from '@angular/core';
import {BallotModel} from '../../models/ballot-model';

@Component({
  selector: 'app-av-ballot',
  templateUrl: './av-ballot.component.html',
  styleUrls: ['./av-ballot.component.css']
})
export class AvBallotComponent implements OnInit {

  @Input() ballot: BallotModel;

  constructor() { }

  ngOnInit() {
  }

}
