import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';


@Injectable()
export class ElectorateService {

  constructor(
    private afs: AngularFirestore
  ) { }

  getElectorate(election: string) {
    const ballots = this.afs.collection('election/' + election + '/electorate', refs => {return refs;});
    return ballots.snapshotChanges();
  }
}
