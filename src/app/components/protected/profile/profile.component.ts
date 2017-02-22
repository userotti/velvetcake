import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }                 from '@angular/common';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { FirebaseApp } from 'angularfire2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  firebaseRef: any;
  profileForm: FormGroup;
  uploading_profile_pic: boolean;

  user: any;

  constructor(@Inject(FirebaseApp) firebaseApp: any,
              private formBuilder: FormBuilder,
              private _location: Location) {


    this.firebaseRef = firebaseApp;
    console.log("firebaseApp: ", firebaseApp);

    this.profileForm = this.formBuilder.group({
      email: '',
      displayName: '',
      photoUrl: ''

    })

  }

  ngOnInit() {

    this.user = this.firebaseRef.auth().currentUser;
    console.log("this.user.photoUrl: ", this.user.photoUrl);
    console.log("this.user: ", this.user);


    this.profileForm.patchValue({
      email: this.user.email,
      displayName: this.user.displayName,
      photoUrl: this.user.photoUrl
    })

  }

  uploadImage(imageNamePrefix, file) {

    this.uploading_profile_pic = true;
    let ref = this.firebaseRef.storage().ref().child('images/profile_pics/'+ imageNamePrefix + '-' + this.user.uid);
    var metadata = {
      contentType: 'image/jpeg',
    };

    return ref.put(file, metadata);

  }

  uploadProfilePic(event) {
    this.uploadImage('thumbnail', event.target.files[0]).then((snapshot)=>{
      this.uploading_profile_pic = false;
      this.profileForm.patchValue({
        photoUrl: snapshot.downloadURL,
      });
    });

  }

  updateProfile() {
    console.log("this.profileForm.value: ", this.profileForm.value);
    this.user.updateProfile(this.profileForm.value).then(()=>{


      this._location.back();
    }, (error)=>{

    })
  }

}
