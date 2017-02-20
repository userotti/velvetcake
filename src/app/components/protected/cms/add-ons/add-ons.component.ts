import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Router } from '@angular/router';

import { AddOn }             from '../../../../models/add-on.model';
import { AddOnService }             from '../../../../services/add-on.service';

@Component({
  selector: 'app-add-ons',
  templateUrl: './add-ons.component.html',
  styleUrls: ['./add-ons.component.scss']
})
export class AddOnsComponent implements OnInit {

  loading = true;
  addOns: AddOn[];

  constructor(
    private af: AngularFire,
    private router: Router,
    private addOnService: AddOnService) {

  }

  ngOnInit() {

    this.addOnService.findAllAddOns({
      query : {
        orderByChild: 'description'
      }
    }).subscribe(addOns => {
      this.loading = false;
      this.addOns = addOns
    })


  }

  addNewItem() {

    this.addOnService.createNewAddOn().then(addOn => {
      this.router.navigate(['/cms/add-ons', addOn.key]);
    })

  }
}
