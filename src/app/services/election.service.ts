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
   */
  searchForUser(uid: string) {
    const election = this.afs.collection('election', ref => ref.where('user', '==', uid));
    return election.snapshotChanges();
  }

  getDocument(uid: string) {
    const document = this.afs.doc('election/' + uid);
    return document.valueChanges();
  }

}
