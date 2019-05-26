import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NgProgressRef, NgProgress } from "@ngx-progressbar/core";
import { PuebloService } from "../../../services/pueblos/pueblo.service";
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-create-pueblos',
  templateUrl: './create-pueblos.component.html',
  styleUrls: ['./create-pueblos.component.css']
})
export class CreatePueblosComponent implements OnInit {
  registrarPueblo: FormGroup;
  nombre: string;
  estado: string = "estado";
  descripcion: string;
  progressRef: NgProgressRef;
  lat: number = 19.432608;
  lng: number = -99.133208;
  data;
  locationChosen = false;
  estados:string[] = [ "Aguascalientes",
              "Baja California",
              "Baja California Sur",
              "Campeche",
              "Chiapas",
              "Chihuahua",
              "Coahuila",
              "Colima",
              "Durango",
              "Ciudad México",
              "Guanajuato",
              "Guerrero",
              "Hidalgo",
              "Jalisco",
              "Michoacán",
              "Morelos",
              "Nayarit",
              "Nuevo León",
              "Oaxaca",
              "Puebla",
              "Querétaro",
              "Quintana Roo",
              "San Luis Potosí",
              "Sinaloa",
              "Sonora",
              "Tabasco",
              "Tamaulipas",
              "Tlaxcala",
              "Veracruz",
              "Yucatán",
              "Zacatecas"];
  constructor(
    private formBuilder: FormBuilder,
    private progress: NgProgress,
    private pueblo: PuebloService,
    private spinner: NgxSpinnerService,
    private ng: NgZone,
    private route: Router,
  ) {
    this.registrarPueblo = this.formBuilder.group({
      nombre: ["", [Validators.required]],
      estado: ["", [Validators.required]],
      descripcion: ["", [Validators.required]]
    });
  }

  ngOnInit() {
    this.progressRef = this.progress.ref("progressBar");
  }

  onMapClick(event){
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
    this.locationChosen = true;
  }

  setPueblo(event){
    this.spinner.show();
    this.data = {nombre: event.srcElement[0].value, estado: event.srcElement[1].value, descripcion: event.srcElement[2].value };

    this.pueblo.crearPueblo(this.data, event.srcElement[3].files, this.lat, this.lng).then(pro =>{
      this.ng.run(() => {
        this.route.navigate(["pueblos"]);
        this.spinner.hide();
      });
      
    }).catch();
  }
}
