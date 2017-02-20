import { Component, Input, OnInit } from '@angular/core'
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { Location }                 from '@angular/common';
import { Subscription }             from 'rxjs';


import { AddOn }             from '../../../../models/add-on.model';
import { AddOnService }             from '../../../../services/add-on.service';


@Component({
  selector: 'app-add-on',
  templateUrl: './add-on.component.html',
  styleUrls: ['./add-on.component.scss']
})
export class AddOnComponent implements OnInit {


  loading = true;
  addOn: AddOn;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private af: AngularFire,
    private router : Router,
    private _location: Location,
    private addOnService: AddOnService,
    private fb: FormBuilder,
  ) {

    this.form = this.fb.group({
      description: '',
      price: ''
    })

  }

  ngOnInit() {

    this.route.params.switchMap((params: Params) => {
      return this.addOnService.findAddOnByKey(params['id']);
    }).take(1).subscribe((addOn: AddOn) => {
      this.loading = null;
      this.addOn = addOn;

      console.log("this.addOn: ", this.addOn);
      this.form.patchValue(addOn);
    });

  }

  deleteItem() {
    this.addOnService.deleteAddOn(this.addOn).then(item => {
      this._location.back();
    });
  }

  updateItem() {

    this.addOn.patchValues(this.form.value);
    this.addOnService.saveAddOn(this.addOn).then(() => {
      this._location.back();
    });

  }

}
