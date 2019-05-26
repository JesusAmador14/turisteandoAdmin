import { Component, OnInit, NgZone, ViewChild } from "@angular/core";
import { PuebloService } from "../../services/pueblos/pueblo.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { NgProgress, NgProgressRef } from '@ngx-progressbar/core';
import { ActividadesService } from '../../services/actividades/actividades.service';
import { DialogComponent } from "../../components/dialog/dialog.component";

@Component({
  selector: "app-actividades",
  templateUrl: "./actividades.component.html",
  styleUrls: ["./actividades.component.css"]
})
export class ActividadesComponent implements OnInit {
  _id: string;
  dataPueblo: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource();
  progressRef: NgProgressRef;
  displayedColumns = ["nombre", "estado", "acciones"];
  constructor(
    private pueblo: PuebloService,
    private actividades: ActividadesService,
    private _route: ActivatedRoute,
    private dialog: MatDialog,
    private ng: NgZone,
    private route: Router,
    private progress: NgProgress
  ) {
    this._id = this._route.snapshot.paramMap.get("id");
  }

  ngOnInit() {
    this.progressRef = this.progress.ref("progressBar");
    this.actividades.getActividadesByPueblo(this._id).subscribe(res => {
      this.dataSource.data = res.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        };
      });
      console.log(this.dataSource.data);
    });
    return this.pueblo.getPueblo(this._id).subscribe(doc => {
      this.dataPueblo = doc.data();
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  filtrar(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  delete(_id, nombre): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: "350px",
      data: { nombre: nombre }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.actividades
          .delete(_id)
          .then(res => {
            console.log("Actividad eliminada");
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
  }
}