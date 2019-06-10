import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  FormBuilder,
  FormGroup,
  Validators
} from "@angular/forms";
import { ErrorStateMatcher } from '@angular/material';
import { NgProgress, NgProgressRef } from '@ngx-progressbar/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { PuebloService } from 'src/app/services/pueblos/pueblo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Location } from "@angular/common";
import { GastronomiaService } from '../../../services/gastronomia/gastronomia.service';

@Component({
  selector: "app-create-gastronomia",
  templateUrl: "./create-gastronomia.component.html",
  styleUrls: ["./create-gastronomia.component.css"]
})
export class CreateGastronomiaComponent implements OnInit {
  _id: string;
  pueblo: any;
  nombre: string;
  descripcion: string;
  matcher = new MyErrorStateMatcher();
  registrarComida: FormGroup;
  progressRef: NgProgressRef;
  @ViewChild("autosize") autosize: CdkTextareaAutosize;

  constructor(
    private _route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private ngZone: NgZone,
    private spinner: NgxSpinnerService,
    private puebloService: PuebloService,
    private route: Router,
    private progress: NgProgress,
    private _location: Location,
    private gastronomia: GastronomiaService
  ) {
    this._id = this._route.snapshot.paramMap.get("id");
    this.registrarComida = this.formBuilder.group({
      nombre: ["", [Validators.required]],
      descripcion: ["", [Validators.required, Validators.minLength(15), Validators.maxLength(320)]]
    });
  }

  ngOnInit() {}

  triggerResize() {
    this.ngZone.onStable
      .pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  setComida(event) {
    this.spinner.show();
    var data = {
      idPueblo: this._id,
      nombre: event.srcElement[0].value,
      descripcion: event.srcElement[1].value
    };
    this.gastronomia.crearGastronomia(data, event.srcElement[2].files).then(res =>{
      this.ngZone.run(() => {
        this._location.back();
        this.spinner.hide();
      });
    }).catch();
  }
}
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}
