import { Component, OnInit, ViewChild, Inject, NgZone } from "@angular/core";
import { PuebloService } from "../../services/pueblos/pueblo.service";
import { MatTableDataSource, MatPaginator, MatDialog } from "@angular/material";
import { DialogComponent } from "../../components/dialog/dialog.component";
import { NgProgress, NgProgressRef } from "@ngx-progressbar/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-pueblos",
  templateUrl: "./pueblos.component.html",
  styleUrls: ["./pueblos.component.css"]
})
export class PueblosComponent implements OnInit {
  estados: string[] = [
    "Aguascalientes",
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
    "Zacatecas"
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource();
  displayedColumns = [
    "nombre",
    "estado",
    "actividades",
    "gastronomia",
    "acciones"
  ];
  progressRef: NgProgressRef;
  constructor(
    private puebloService: PuebloService,
    private dialog: MatDialog,
    private ng: NgZone,
    private route: Router,
    private progress: NgProgress
  ) {}

  ngOnInit() {
    this.progressRef = this.progress.ref("progressBar");
    return this.puebloService.getPueblos().subscribe(res => {
      this.dataSource.data = res.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        };
      });
    });
  }

  // tslint:disable-next-line: use-life-cycle-interface
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  filtrar(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  filtrarEstado(filterValue) {
    this.dataSource.filter = filterValue.source.value.trim().toLowerCase();
  }

  actividades(id) {
    this.progressRef.start();
    this.puebloService._id = id;
    console.log("Pueblo:", id);
    this.ng.run(() => {
      this.route.navigate(["pueblos/actividades/"]);
      this.progressRef.complete();
    });
  }

  delete(id, nombre): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: "350px",
      data: { nombre: nombre }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.puebloService
          .delete(id)
          .then(res => {
            console.log("Pueblo eliminado");
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
  }
}
