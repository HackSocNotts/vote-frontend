import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import {map} from 'rxjs/operator/map';

@Injectable()
export class ElectionService {

  constructor(
    private afs: AngularFirestore
  ) { }

  /**
   * Finds document for specific user id
   * @param {string} uid
   * @return {Observable<any>}
   */
  searchForUser(uid: string) {
    const election = this.afs.collection('election', ref => ref.where('user', '==', uid));
    return election.snapshotChanges();
  }

  /**
   * Fethces a specific document(election)
   * @param {string} uid
   * @return {Observable<any>}
   */
  getDocument(uid: string) {
    const document = this.afs.doc('election/' + uid);
    return document.valueChanges();
  }

  /**
   * Adds a new election
   * @param {string} uid
   * @param {string} name
   * @param {string} description
   * @param {string} user
   * @return {Promise<void>}
   */
  addElection(uid: string, name: string, description: string, user: string) {
    const collection = this.afs.collection('election');
    const doc = collection.doc(uid);
    return doc.set({
      name: name,
      description: description,
      user: user
    });
  }

}
