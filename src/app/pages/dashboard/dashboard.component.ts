import { Component, OnInit } from '@angular/core';

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  width = "100%";
  height = 300;
  type = "line";
  dataFormat = "json";
  dataSource = data;


  widthPie = "100%";
  heightPie = 300;
  typePie = "pie3d";
  dataFormatPie = "json";
  dataSourcePie = dataPie;
  constructor() {}

  ngOnInit() {}
}
const dataPie = {
  chart: {
    caption: "Categorias de Actividades",
    subcaption: "Todos los tiempos",
    showvalues: "1",
    showpercentintooltip: "0",
    enablemultislicing: "1",
    theme: "fusion"
  },
  data: [
    {
      label: "Cultural",
      value: "379"
    },
    {
      label: "Acuática",
      value: "1240"
    },
    {
      label: "Aventura",
      value: "790"
    }
  ]
};
const data = {
  chart: {
    caption: "Número de visitas",
    yaxisname: "Visitas",
    subcaption: "[Ene - Dic 2019]",
    numbersuffix: " personas",
    rotatelabels: "2",
    setadaptiveymin: "2",
    theme: "fusion"
  },
  data: [
    {
      label: "Enero",
      value: "40"
    },
    {
      label: "Febrero",
      value: "68"
    },
    {
      label: "Marzo",
      value: "124"
    },
    {
      label: "Abril",
      value: "90"
    },
    {
      label: "Mayo",
      value: "90"
    },
    {
      label: "Junio",
      value: "130"
    },
    {
      label: "Julio",
      value: "110"
    },
    {
      label: "Agosto",
      value: "30"
    },
    {
      label: "Septiembre",
      value: "57"
    },
    {
      label: "Octubre",
      value: "90"
    },
    {
      label: "Noviembre",
      value: "89"
    },
    {
      label: "Diciembre",
      value: "120"
    }
  ]
};