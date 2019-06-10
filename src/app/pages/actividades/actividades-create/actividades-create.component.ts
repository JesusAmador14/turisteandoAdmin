import { Component, OnInit, ViewChild, NgZone } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PuebloService } from "../../../services/pueblos/pueblo.service";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  FormGroupDirective
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material";
import { CdkTextareaAutosize } from "@angular/cdk/text-field";
import { NgProgressRef, NgProgress } from "@ngx-progressbar/core";
import { take } from "rxjs/operators";
import { NgxSpinnerService } from "ngx-spinner";
import { ActividadesService } from "../../../services/actividades/actividades.service";
import { Location } from "@angular/common";

@Component({
  selector: "app-actividades-create",
  templateUrl: "./actividades-create.component.html",
  styleUrls: ["./actividades-create.component.css"]
})
export class ActividadesCreateComponent implements OnInit {
  _id: string;
  pueblo: any;
  registrarActividad: FormGroup;
  progressRef: NgProgressRef;
  nombre: string;
  categorias: string[] = ["Acuática", "Cultural", "Aventura"];
  etiquetas: string[] = ["Nadar", "Escalar", "Caminar", "Museo", "Parque", "Ruinas", "Buceo"];
  categoria: string = "categoria";
  etiqueta: string = "etiqueta";
  calle: string;
  colonia: string;
  numero: number;
  horarioEntrada: string;
  horarioSalida: string;
  descripcion: string;
  matcher = new MyErrorStateMatcher();

  @ViewChild("autosize") autosize: CdkTextareaAutosize;

  constructor(
    private _route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private ngZone: NgZone,
    private spinner: NgxSpinnerService,
    private actividad: ActividadesService,
    private puebloService: PuebloService,
    private route: Router,
    private progress: NgProgress,
    private _location: Location
  ) {
    this._id = this._route.snapshot.paramMap.get("id");
    this.registrarActividad = this.formBuilder.group({
      nombre: ["", [Validators.required, Validators.minLength(6)]],
      calle: ["", [Validators.minLength(6)]],
      colonia: ["", [Validators.minLength(6)]],
      numero: ["", []],
      categoria: ["", []],
      etiqueta: ["", []],
      horarioEntrada: ["", []],
      horarioSalida: ["", []],
      descripcion: [
        "",
        [
          Validators.required,
          Validators.minLength(15),
          Validators.maxLength(320)
        ]
      ]
    });
  }

  ngOnInit() {
    this.progressRef = this.progress.ref("progressBar");
    return this.puebloService.getPueblo(this._id).subscribe(res => {
      this.pueblo = res.data();
    });
  }

  triggerResize() {
    this.ngZone.onStable
      .pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  setActividad(event) {
    this.spinner.show();
    let dias = this.diasHabiles(event);
    let data = {
      idPueblo: this._id,
      nombre: event.srcElement[0].value,
		categoria: this.categoria,
		etiqueta: this.etiqueta,
      descripcion: event.srcElement[1].value,
      calle: event.srcElement[3].value,
      colonia: event.srcElement[4].value,
      numero: event.srcElement[5].value,
      horarioEntrada: event.srcElement[14].value,
      horarioSalida: event.srcElement[15].value,
		dias: dias,
		visitas: 0
    };

    this.actividad
      .crearActividad(data, event.srcElement[2].files)
      .then(pro => {
        this.ngZone.run(() => {
          this._location.back();
          this.spinner.hide();
        });
      })
      .catch();
  }

  diasHabiles(event) {
    var dias = "";
    for (let i = 6; i <= 13; i++) {
      if (event.srcElement[i].checked == true) {
        if (event.srcElement[i].value == "Todos") {
          dias = "Todos";
          break;
        }
        dias = dias + event.srcElement[i].value + ", ";
      }
    }
    return dias;
  }
  selectCategoria(value) {
    this.categoria = value;
  }
  selectEtiqueta(value) {
    this.etiqueta = value;
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
