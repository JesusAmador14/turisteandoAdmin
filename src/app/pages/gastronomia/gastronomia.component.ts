import { Component, OnInit, ViewChild, NgZone } from "@angular/core";
import { MatTableDataSource, MatDialog, MatPaginator } from "@angular/material";
import { NgProgress, NgProgressRef } from "@ngx-progressbar/core";
import { PuebloService } from "src/app/services/pueblos/pueblo.service";
import { ActivatedRoute, Router } from "@angular/router";
import { GastronomiaService } from '../../services/gastronomia/gastronomia.service';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';

@Component({
  selector: "app-gastronomia",
  templateUrl: "./gastronomia.component.html",
  styleUrls: ["./gastronomia.component.css"]
})
export class GastronomiaComponent implements OnInit {
  _id: string;
  dataPueblo: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource();
  progressRef: NgProgressRef;
  displayedColumns = ["nombre", "estado", "acciones"];
  constructor(
    private pueblo: PuebloService,
    private _route: ActivatedRoute,
    private dialog: MatDialog,
    private ng: NgZone,
    private route: Router,
    private progress: NgProgress,
    private gastronomia: GastronomiaService
  ) {
    this._id = this._route.snapshot.paramMap.get("id");
  }
  ngOnInit() {
    this.progressRef = this.progress.ref("progressBar");
    this.gastronomia.getGastronomiaByPueblo(this._id).subscribe(res => {
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

  delete(id, nombre) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: "350px",
      data: { nombre: nombre }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.gastronomia
          .delete(id)
          .then(res => {
            console.log("Gastronomia eliminada");
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
  }
}
