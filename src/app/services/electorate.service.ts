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

  generate(count: number, uid: string) {
    for (let i = 0; i < count; i++) {
      this.addCode(this.generateCode(), uid);
    }
  }

  addCode(code: string[8], uid: string) {
    const collection = this.afs.collection('election/' + uid + '/electorate');
    const doc = collection.doc(code);
    console.log('new code: %s', code);
    return doc.set({});
  }

  generateCode() {
    return Math.random().toString(36).substring(2, 6) + Math.random().toString(36).substring(8, 12);
  }
}
