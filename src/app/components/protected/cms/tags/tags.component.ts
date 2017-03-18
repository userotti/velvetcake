import { Component, OnInit } from '@angular/core';

import { AngularFire } from 'angularfire2';
import { Router } from '@angular/router';
import { Subscription, Observable }             from 'rxjs';

import { Tag }             from '../../../../models/tag.model';
import { TagService }             from '../../../../services/tag.service';


@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {

  tags$: Observable<Tag[]>;

  constructor(
    private af: AngularFire,
    private router: Router,
    private tagService: TagService) {

    }

    ngOnInit() {

      this.tags$ = this.tagService.findAllTags({
        query: {
          orderByChild : "description",
        }
      })
    }

    addNewItem() {

      this.tagService.createNewTag().then(tag => {

        this.router.navigate(['/cms/tags', tag.key]);

      });

    }

  }
