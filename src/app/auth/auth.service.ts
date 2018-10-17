import * as firebase from 'firebase';
import {Injectable} from '@angular/core';
import UserCredential = firebase.auth.UserCredential;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token;

  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(error => {
        console.log(error);
        alert('There was an error when signing up: ' + error);
      });
  }

  signinUser(email: string, password: string): Promise<UserCredential> {
    return firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential: UserCredential) => {
        this.getToken();
        return Promise.resolve(userCredential);
      });
  }

  logout() {
    firebase.auth().signOut();
    this.token = null;
  }

  getUser(): firebase.User | null {
    return firebase.auth().currentUser;
  }

  getToken(): string {
    firebase.auth().currentUser.getIdToken()
      .then(
        (token: string) => this.token = token
      );

    return this.token;
  }

  isAuthenticated(): boolean {
    return this.token != null;
  }

}
