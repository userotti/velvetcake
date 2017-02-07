import { Component, OnInit } from '@angular/core';

import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {

  items: FirebaseListObservable<any[]>;
  isLoading: boolean;

  constructor(
    private af: AngularFire,
    private router: Router) {

  }

  ngOnInit() {

    this.isLoading = true;

    this.items = this.af.database.list('/tags');
    this.items.subscribe(complete => {
            this.isLoading = false;
        });

  }

  addNewItem() {

    this.items.push({}).then(item => {
      this.router.navigate(['/cms/tags', item.key]);
    })

  }

}
