import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
    const config = {
      apiKey: 'AIzaSyD4fokqEZAWBbx9HHGXCUbQzq0SBkjODl4',
      authDomain: 'ng-recipe-book-a5708.firebaseapp.com',
    };
    firebase.initializeApp(config);
  }

}
