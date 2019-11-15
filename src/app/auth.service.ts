import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { SessionService } from './services/session.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth, public session:SessionService, private route: Router){}

  doGoogleLogin(){
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth.auth
      .signInWithPopup(provider)
      .then(res => {
        resolve(res);
      }, err => {
        console.log(err);
        reject(err);
      })
    })
  }

  /*sendToken(token: string) {
    localStorage.setItem("LoggedInUser", token)
  }
  getToken() {
    return localStorage.getItem("LoggedInUser")
  }
  isLoggedIn() {
    return this.getToken() !== null;
  }
  logout() {
    localStorage.removeItem("LoggedInUser");
    this.myRoute.navigate(["Login"]);
  }*/

  public isSignedIn() {
    return !!this.session.accessToken;
  }

  public doSignOut() {
    this.session.destroy();
    this.route.navigate(["login"]);
  }

  public doSignIn(accessToken: string, name: string) {
    if ((!accessToken) || (!name)) {
      return;
    }
    this.session.accessToken = accessToken;
    this.session.name = name;
  }

}
