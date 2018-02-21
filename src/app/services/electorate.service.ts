import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {ElectorModel} from '../models/elector-model';


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

  delete(election: string, code: string) {
    const document = this.afs.doc('election/' + election + '/electorate/' + code);
    return document.delete();
  }

  getElector(election: string, uid: string) {
    const document = this.afs.doc('election/' + election + '/electorate/' + uid);
    return document.valueChanges();
  }

  castAdvVote(election: string, elector: ElectorModel, ballot: string, candidate: string, value: number) {
    const document = this.afs.doc('election/' + election + '/electorate/' + elector.id);
    const update = elector;
    update.votes[ballot].votes[candidate] = value;
    update.locked = false;
    document.update(update);
  }
}
