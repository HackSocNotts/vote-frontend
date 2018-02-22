import {BallotModel} from './ballot-model';
import {CandidateModel} from './candidate-model';

export interface ElectionModel {
  uid: string;
  name: string;
  description: string;
  user: string;
  ballots: BallotModel[];
  candidate: CandidateModel[];
  electorate: any[];
}
