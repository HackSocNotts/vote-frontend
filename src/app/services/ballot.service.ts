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

}
