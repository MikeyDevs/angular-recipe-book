import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';
import { RecipeService } from "../recipes/recipe.services";

@Injectable()
export class AuthService {
token: string;
userEmail: string;

  constructor(private router: Router, private recipeService: RecipeService) {}

  signupUser(email: string, password: string) {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(response => {
        this.router.navigate(['/recipes']);
        this.userEmail = firebase.auth().currentUser.email
      })
      .catch(
        (error) => {
          console.log(error);
          throw error;
        }
      )
  }

  signinUser(email: string, password: string) {
      return firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
         response => {
          this.router.navigate(['/recipes']);
          this.userEmail = firebase.auth().currentUser.email
          return firebase.auth().currentUser.getIdToken()
            .then(
              (token: string) => this.token = token
            )
        }
      )
      .catch(
        (error) => {
          console.log(error);
          throw error;
        });
  }

  logout() {
    firebase.auth().signOut();
    this.token = null;
    this.userEmail = "";
    this.recipeService.onClearRecipes();
    this.router.navigate(['/']);
  }

  getToken() {
    firebase.auth().currentUser.getIdToken()
      .then(
        (token: string) => this.token = token
      );
    return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }

  loadUser() {
    firebase.auth().onAuthStateChanged((currentUser) => {
        if (currentUser === null) {
            this.token = null;
        } else {
            currentUser.getIdToken().then(
                (token: string) => this.token = token
            );
        }
    });
}
}
