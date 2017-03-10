import { Component, OnInit } from '@angular/core';

import { AngularFire } from 'angularfire2';
import { Router } from '@angular/router';

import { Tag }             from '../../../../models/tag.model';
import { TagService }             from '../../../../services/tag.service';


@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {

  tags: Tag[];
  isLoading: boolean;

  constructor(
    private af: AngularFire,
    private router: Router,
    private tagService: TagService) {

    }

    ngOnInit() {

      this.isLoading = true;

      this.tagService.findAllTags({
        query: {
          orderByChild : "description",
        }
      }).subscribe(tags => {
        console.log("Tags", tags);
        this.isLoading = false;
        this.tags = tags
      });

    }

    addNewItem() {

      this.tagService.createNewTag().then(tag => {

        this.router.navigate(['/cms/tags', tag.key]);

      });

    }

  }
