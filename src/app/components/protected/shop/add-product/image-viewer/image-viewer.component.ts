import { Component, OnInit, Input } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable, FirebaseApp } from 'angularfire2';
import { Subscription, Observable }             from 'rxjs';
import { RelationManagerService }             from '../../../../../services/relation-manager.service';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss']
})
export class ImageViewerComponent implements OnInit {

  @Input() productId: any;

  productsImages$: Observable<any[]>

  constructor(
    private relationsManager: RelationManagerService
  ) { }

  ngOnInit() {

    console.log("productId: ", this.productId);

    this.productsImages$ = this.relationsManager.populateRelationWith('productsImages', 'images', this.productId);
    // this.productsImages$.subscribe(images => {
    //   console.log(ImageViewerComponent.name, images);
    // })

  }

}
