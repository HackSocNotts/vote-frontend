import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';

@Injectable()
export class CandidatesService {

  constructor(
    private afs: AngularFirestore
  ) { }

  getCandidates(election: string) {
    const ballots = this.afs.collection('election/' + election + '/candidates', refs => {return refs;});
    return ballots.snapshotChanges();
  }

  deleteCandidate(election: string, candidate: string) {
    const document = this.afs.doc('election/' + election + '/candidates/' + candidate);
    return document.delete();
  }

  editCandidate(election: string, uid: string, candidate: any) {
    const document = this.afs.doc('election/' + election + '/candidates/' + uid);
    return document.update(candidate);
  }

  addCandidate(election: string, candidate: any) {
    const collection = this.afs.collection('election/' + election + '/candidates');
    return collection.add({
      name: candidate.name,
      manifesto: candidate.manifesto,
    });
  }
}
