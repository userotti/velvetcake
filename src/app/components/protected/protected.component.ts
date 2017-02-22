import { Component, OnInit, Inject } from '@angular/core';
import { FirebaseApp } from 'angularfire2';

@Component({
  selector: 'app-protected',
  templateUrl: './protected.component.html',

  styleUrls: ['./protected.component.scss']
})

export class ProtectedComponent implements OnInit {

  firebaseRef: any;
  user: any;

  constructor(@Inject(FirebaseApp) firebaseApp: any) {

    this.firebaseRef = firebaseApp;
    console.log("firebaseApp: ", firebaseApp);


  }

  ngOnInit() {

    this.user = this.firebaseRef.auth().currentUser;
    console.log("this.user: ", this.user);

    this.firebaseRef.auth().onAuthStateChanged((user)=>{

      this.user = user;

    });

  }

}
