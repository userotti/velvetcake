import { Component, Input, OnInit } from '@angular/core'
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { Location }                 from '@angular/common';
import { Subscription }             from 'rxjs';

import { RelationManagerService }             from '../../../../services/relation-manager.service';

import { Tag }             from '../../../../models/tag.model';
import { TagService }             from '../../../../services/tag.service';


import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {

  loading = true;
  tag: Tag;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private af: AngularFire,
    private router : Router,
    private _location: Location,
    private relationManager: RelationManagerService,
    private tagService: TagService,
    private fb: FormBuilder

  ) {

    this.form = this.fb.group({
      description: '',
      price: ''
    })

  }

  ngOnInit() {

    this.route.params.switchMap((params: Params) => {
      return this.tagService.findTagByKey(params['id']);
    }).take(1).subscribe((tag: Tag) => {
      this.loading = null;
      this.tag = tag;

      console.log("this.addOn: ", this.tag);
      this.form.patchValue(tag);
    });

  }

  deleteItem() {

    this.tagService.deleteTag(this.tag).then(() => {

      this.relationManager.itemDeletedCleanup('tagsProducts', 'productsTags', this.tag.$key);
      this._location.back();
    });


  }

  updateItem() {

    this.tag.patchValues(this.form.value);

    this.tagService.saveTag(this.tag).then(() => {
      this._location.back();
    });

  }


}
