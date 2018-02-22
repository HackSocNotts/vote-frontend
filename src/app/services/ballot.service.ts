import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import {BallotModel} from '../models/ballot-model';

@Injectable()
export class BallotService {

  constructor(
    private afs: AngularFirestore
  ) { }

  getBallots(election: string) {
    const ballots = this.afs.collection('election/' + election + '/ballots', refs => {return refs;});
    return ballots.snapshotChanges();
  }

  deleteBallot(election: string, ballot: string) {
    const document = this.afs.doc('election/' + election + '/ballots/' + ballot);
    return document.delete();
  }

  addBallot(election: string, ballot: any) {
    const collection = this.afs.collection('election/' + election + '/ballots');
    return collection.add({
      name: ballot.name,
      description: ballot.description,
      type: ballot.type
    });
  }

  assignCandidate(election: string, ballot: BallotModel, candidate: string) {
    const document = this.afs.doc('election/' + election + '/ballots/' + ballot.id);
    const update = ballot;
    update.candidates.push(candidate);
    return document.update(update);
  }

  unAssignCandidate(election: string, ballot: BallotModel, candidate: string) {
    const document = this.afs.doc('election/' + election + '/ballots/' + ballot.id);
    const update = ballot;
    update.candidates = update.candidates.filter(item => item !== candidate);
    return document.update(update);
  }
}
