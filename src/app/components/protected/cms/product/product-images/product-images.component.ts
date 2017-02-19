import { Component, OnInit, Input } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable, FirebaseApp } from 'angularfire2';
import { Subscription, Observable }             from 'rxjs';
import { RelationManagerService }             from '../../../../../services/relation-manager.service';


import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-images',
  templateUrl: './product-images.component.html',
  styleUrls: ['./product-images.component.scss']
})


export class ProductImagesComponent implements OnInit {

  @Input() productId: any;
  @Input() firebaseRef: any;

  uploading_image: boolean;
  //refernce to the specific product's images
  productImagesAFObject: FirebaseObjectObservable<any[]>;

  //refernce to the specific product's images populated
  productImagesAFListPopulated: Observable<any[]>;

  //all images
  imagesAFList: FirebaseListObservable<any[]>;

  constructor(
    private af: AngularFire,
    private relationsManager: RelationManagerService
  ) { }

  ngOnInit() {

    console.log("productId: ", this.productId);

    this.productImagesAFObject = this.af.database.object('/productImages/'+this.productId);
    this.imagesAFList = this.af.database.list('/images');
    this.productImagesAFListPopulated = this.relationsManager.populateRelationWith('productImages', 'images', this.productId);

  }



  uploadImage(imageNamePrefix, file, imageId) {

    let ref = this.firebaseRef.storage().ref().child('images/'+ this.productId + '/'+imageNamePrefix + '-' + imageId);
    var metadata = {
      contentType: 'image/jpeg',
    };

    return ref.put(file, metadata);

  }

  addImage(event) {

    console.log("event: ", event);
    this.uploading_image = true;

    this.firebaseRef.database().ref('/images').push({}).then((newImage)=>{
      console.log("newImage: ", newImage);
      this.uploadImage('additional', event.target.files[0], newImage.key).then((snapshot)=>{

        console.log("snapshot: ",snapshot);
        this.af.database.object('/images/'+newImage.key).update({
          url: snapshot.downloadURL
        }).then(()=>{

          console.log("image record updated: ", newImage.key);

          if (newImage.key){
            this.relationsManager.setRelationOnlyOne('productImages', this.productId, newImage.key, true).then(()=>{
              console.log("done");
              this.uploading_image = false;
            });
          }

        });

      });
    })



  }

  removeImage(imageKey) {

    this.af.database.object('/images/'+imageKey).remove().then(()=>{
      this.relationsManager.setRelationOnlyOne('productImages', this.productId, imageKey, null).then(()=>{
        console.log("done");
      });
    });



  }


}
