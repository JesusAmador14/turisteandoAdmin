import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from "../../../services/auth/auth.service";
import { Router } from "@angular/router";
import { NgForm, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NgProgressRef, NgProgress } from "@ngx-progressbar/core";
@Component({
  selector: 'app-create-pueblos',
  templateUrl: './create-pueblos.component.html',
  styleUrls: ['./create-pueblos.component.css']
})
export class CreatePueblosComponent implements OnInit {
  registrarPueblo: FormGroup;
  name: string;
  estado: string;
  progressRef: NgProgressRef;
  lat: number = 51.678418;
  lng: number = 7.809007;
  locationChosen = false;
  constructor(
    private auth: AuthService,
    private ng: NgZone,
    private route: Router,
    private formBuilder: FormBuilder,
    private progress: NgProgress
  ) {
    this.registrarPueblo = this.formBuilder.group({
      name: ["", [Validators.required, Validators.email]],
      estado: ["", [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    this.progressRef = this.progress.ref("progressBar");
  }


  onMapClick(event){
    console.log(event);
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
    this.locationChosen = true;
  }
  setPueblo(){

  }
  onFilesAdded(files: File[]) {
  console.log(files);
 
  files.forEach(file => {
    const reader = new FileReader();
 
    reader.onload = (e: ProgressEvent) => {
      const content = (e.target as FileReader).result;
 
      // this content string could be used as an image source
      // or be uploaded to a webserver via HTTP.
      console.log(content);
    };
 
    // use this for basic text files like .txt or .csv
    //reader.readAsText(file);
 
    // use this for images
    reader.readAsDataURL(file);
  });
}
}
