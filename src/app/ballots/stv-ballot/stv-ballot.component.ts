import {Component, Input, OnInit} from '@angular/core';
import {BallotModel} from '../../models/ballot-model';

@Component({
  selector: 'app-stv-ballot',
  templateUrl: './stv-ballot.component.html',
  styleUrls: ['./stv-ballot.component.css']
})
export class StvBallotComponent implements OnInit {

  @Input() ballot: BallotModel;

  constructor() { }

  ngOnInit() {
  }

}
