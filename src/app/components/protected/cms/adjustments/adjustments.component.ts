import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Router } from '@angular/router';
import { Subscription, Observable }             from 'rxjs';

import { Adjustment }             from '../../../../models/adjustment.model';
import { AdjustmentService }             from '../../../../services/adjustment.service';

@Component({
  selector: 'app-adjustments',
  templateUrl: './adjustments.component.html',
  styleUrls: ['./adjustments.component.scss']
})
export class AdjustmentsComponent implements OnInit {

  adjustments$: Observable<Adjustment[]>;

  constructor(
    private af: AngularFire,
    private router: Router,
    private adjustmentService: AdjustmentService) {

  }

  ngOnInit() {

    this.adjustments$ = this.adjustmentService.findAllAdjustments({
      query : {
        orderByChild: 'description'
      }
    })


  }

  addNewItem() {

    this.adjustmentService.createNewAdjustment().then(adjustment => {
      this.router.navigate(['/cms/adjustments', adjustment.key]);
    })

  }
}
