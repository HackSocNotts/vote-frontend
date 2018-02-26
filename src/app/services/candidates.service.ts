import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';

@Injectable()
export class CandidatesService {

  constructor(
    private afs: AngularFirestore
  ) { }

  getCandidates(election: string) {
    const collection = this.afs.collection('election/' + election + '/candidates', refs => {return refs;});
    return collection.snapshotChanges();
  }

  getCandidate(election: string, uid: string) {
    const candidate = this.afs.doc('election/' + election + '/candidates/' + uid);
    return candidate.valueChanges();
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
    const candidate_data = {
      id: '',
      name: candidate.name,
      manifesto: candidate.manifesto
    };
    return collection.add(candidate)
      .then(newCandidate => {
        candidate_data.id = newCandidate.id;
        return newCandidate.update(candidate_data);
      });
  }
}
