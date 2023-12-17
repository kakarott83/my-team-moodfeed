import { Injectable } from '@angular/core';
import { Voting } from '../model/voting';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Question } from '../model/question';


@Injectable({
  providedIn: 'root'
})

//https://www.bezkoder.com/angular-16-firestore-crud/

export class VotingService {
  private votingPath = '/votings'
  private questionPath = '/questions'

  votingRef!: AngularFirestoreCollection<Voting>;
  questionsRef!: AngularFirestoreCollection<Question>;

  constructor(private db: AngularFirestore) {
    this.votingRef = db.collection(this.votingPath);
    this.questionsRef = db.collection(this.questionPath);
  }

  /**************Voting Methods**************/
  getAllVotings(): AngularFirestoreCollection<Voting> {
    return this.votingRef;
  }

  createVoting(voting: Voting): any {
    return this.votingRef.add({...voting});
  }

  updateVoting(id: string, data: any) {
    return this.votingRef.doc(id).update(data);
  }

  deleteVoting(id: string) {
    return this.votingRef.doc(id).delete();
  }

  /**************Question Methods**************/

  getAllQuestions(): AngularFirestoreCollection<Question> {
    return this.questionsRef;
  }

  createQuestion(question: Question): any {
    return this.questionsRef.add({...question});
  }

  updateQuestion(id: string, data: any) {
    return this.questionsRef.doc(id).update(data);
  }

  deleteQuestion(id: string) {
    return this.questionsRef.doc(id).delete();
  }

}
