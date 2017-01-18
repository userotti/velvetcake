import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-ons',
  templateUrl: './add-ons.component.html',
  styleUrls: ['./add-ons.component.scss']
})
export class AddOnsComponent implements OnInit {

  items: FirebaseListObservable<any[]>;
  isLoading: boolean;

  constructor(
    private af: AngularFire,
    private router: Router) {

  }

  ngOnInit() {

    this.isLoading = true;

    this.items = this.af.database.list('/add-ons');
    this.items.subscribe(complete => {
            this.isLoading = false;
        });

  }

  addNewItem() {

    this.items.push({}).then(item => {
      this.router.navigate(['/cms/add-ons', item.key]);
    })

  }
}
