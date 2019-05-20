import { Component, OnInit, ViewChild } from '@angular/core';
import { PuebloService } from '../../services/pueblos/pueblo.service';
import { Pueblo } from "../../models/pueblo/pueblo.model";
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { BehaviorSubject, Observable } from 'rxjs';
import { DataSource } from '@angular/cdk/table';
@Component({
  selector: 'app-pueblos',
  templateUrl: './pueblos.component.html',
  styleUrls: ['./pueblos.component.css']
})
export class PueblosComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource();
  displayedColumns = ['nombre', 'estado', 'acciones'];

  constructor(private puebloService: PuebloService) { }

  ngOnInit() {
    return this.puebloService.getPueblos().subscribe(res => this.dataSource.data = res);
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  filtrar(filterValue: string) {
    // filterValue = filterValue.trim(); // Remove whitespace
    // filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
