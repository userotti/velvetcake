import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adjustments',
  templateUrl: './adjustments.component.html',
  styleUrls: ['./adjustments.component.scss']
})
export class AdjustmentsComponent implements OnInit {

  items: FirebaseListObservable<any[]>;
  isLoading: boolean;

  constructor(
    private af: AngularFire,
    private router: Router) {

  }

  ngOnInit() {

    this.isLoading = true;

    this.items = this.af.database.list('/adjustments');
    this.items.subscribe(complete => {
            this.isLoading = false;
        });

  }

  addNewItem() {

    this.items.push({}).then(item => {
      this.router.navigate(['/cms/adjustments', item.key]);
    })

  }
}
