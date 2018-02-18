import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

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

}
