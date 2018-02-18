import {BallotModel} from './ballot-model';
import {BallotOption} from './ballot-option';

export interface ElectionModel {
  uid: string;
  name: string;
  description: string;
  user: string;
  ballots: BallotModel[];
  candidate: BallotOption[];
  electorate: any[];
}
