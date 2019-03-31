import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {ElectorModel} from '../models/elector-model';
import {Observable} from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class ElectorateService {

  constructor(
    private afs: AngularFirestore,
    private http: HttpClient,
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
    doc.set({});
    return doc.update({
      id: code,
      locked: false,
      assigned: false,
      votes: {}
    });
  }

  generateCode() {
    return Math.random().toString(36).substring(2, 6) + Math.random().toString(36).substring(8, 12);
  }

  delete(election: string, code: string) {
    const document = this.afs.doc('election/' + election + '/electorate/' + code);
    return document.delete();
  }

  getElector(election: string, uid: string): Observable<any> {
    const document = this.afs.doc('election/' + election + '/electorate/' + uid);
    return document.valueChanges();
  }

  addBasicBallot(election: string, elector: ElectorModel, ballot: string) {
    const document = this.afs.doc('election/' + election + '/electorate/' + elector.id);
    const update = elector;
    update.votes[ballot] = {ballotUID: ballot, votes: NaN};
    document.update(update);
  }

  castBasicVote(election: string, elector: ElectorModel, ballot: string, value: number) {
    const document = this.afs.doc('election/' + election + '/electorate/' + elector.id);
    const update = elector;
    update.votes[ballot].votes = value;
    document.update(update);
  }

  addAdvBallot(election: string, elector: ElectorModel, ballot: string) {
    const document = this.afs.doc('election/' + election + '/electorate/' + elector.id);
    const update = elector;
    update.votes[ballot] = {ballotUID: ballot, votes: {}};
    document.update(update);
  }

  castAdvVote(election: string, elector: ElectorModel, ballot: string, candidate: string, value: number) {
    const document = this.afs.doc('election/' + election + '/electorate/' + elector.id);
    const update = elector;
    update.votes[ballot].votes[candidate] = value;
    document.update(update);
  }

  lockBallot(election: string, elector: ElectorModel) {
    const document = this.afs.doc('election/' + election + '/electorate/' + elector.id);
    const update = elector;
    update.locked = true;
    document.update(update);
  }

  getElectorCode(election: string, studentId: number) {
    const url = `https://us-central1-hacksoc-vote.cloudfunctions.net/AssignCode?election=${election}&student=${studentId}`;
    return this.http.get(url);
  }
}
