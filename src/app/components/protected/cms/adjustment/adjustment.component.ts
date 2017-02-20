import { Component, Input, OnInit } from '@angular/core'
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { Location }                 from '@angular/common';
import { Subscription }             from 'rxjs';

import { Adjustment }             from '../../../../models/adjustment.model';
import { AdjustmentService }             from '../../../../services/adjustment.service';


@Component({
  selector: 'app-adjustment',
  templateUrl: './adjustment.component.html',
  styleUrls: ['./adjustment.component.scss']
})
export class AdjustmentComponent implements OnInit {

  loading = true;
  adjustment: Adjustment;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private af: AngularFire,
    private router : Router,
    private _location: Location,
    private adjustmentService: AdjustmentService,
    private fb: FormBuilder,
  ) {

    this.form = this.fb.group({
      description: '',
      detail: ''
    })

  }

  ngOnInit() {

    this.route.params.switchMap((params: Params) => {
      return this.adjustmentService.findAdjustmentByKey(params['id']);
    }).take(1).subscribe((adjustment: Adjustment) => {
      this.loading = null;
      this.adjustment = adjustment;
      this.form.patchValue(adjustment);
    });

  }

  deleteItem() {
    this.adjustmentService.deleteAdjustment(this.adjustment).then(item => {
      this._location.back();
    });
  }

  updateItem() {

    this.adjustment.patchValues(this.form.value);
    this.adjustmentService.saveAdjustment(this.adjustment).then(() => {
      this._location.back();
    });

  }

}
