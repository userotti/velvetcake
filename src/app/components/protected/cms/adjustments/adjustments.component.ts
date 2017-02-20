import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Router } from '@angular/router';

import { Adjustment }             from '../../../../models/adjustment.model';
import { AdjustmentService }             from '../../../../services/adjustment.service';

@Component({
  selector: 'app-adjustments',
  templateUrl: './adjustments.component.html',
  styleUrls: ['./adjustments.component.scss']
})
export class AdjustmentsComponent implements OnInit {

  loading = true;
  adjustments: Adjustment[];

  constructor(
    private af: AngularFire,
    private router: Router,
    private adjustmentService: AdjustmentService) {

  }

  ngOnInit() {

    this.adjustmentService.findAllAdjustments({
      query : {
        orderByChild: 'description'
      }
    }).subscribe(adjustments => {
      this.loading = false;
      this.adjustments = adjustments
    })


  }

  addNewItem() {

    this.adjustmentService.createNewAdjustment().then(adjustment => {
      this.router.navigate(['/cms/adjustments', adjustment.key]);
    })

  }
}
