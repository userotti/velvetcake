import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Velvet Cake Co';
  user = 'Christian';

  items: FirebaseListObservable<any[]>;

  constructor(private af: AngularFire) {
    this.items = af.database.list('/items');
  }

}
