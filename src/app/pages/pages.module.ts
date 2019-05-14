import { NgModule } from "@angular/core";

import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { PagesRoutingModule } from "./pages-routing.module";
import { EscritoresComponent } from "./escritores/escritores.component";
import { PueblosComponent } from "./pueblos/pueblos.component";
import { HeaderComponent } from "../components/header/header.component";
import { SidebarComponent } from "../components/sidebar/sidebar.component";
import { NgProgressModule } from "@ngx-progressbar/core";
import { NgProgressRouterModule } from "@ngx-progressbar/router";

import {
  NavigationStart,
  NavigationError,
  NavigationCancel,
  RouterModule,
  GuardsCheckEnd,
  NavigationEnd,
  GuardsCheckStart
} from "@angular/router";
import { CreatePueblosComponent } from "./pueblos/create-pueblos/create-pueblos.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { AgmCoreModule } from '@agm/core';
import { NgxSpinnerModule } from 'ngx-spinner';


const PAGES_COMPONENTS = [
  PagesComponent,
  EscritoresComponent,
  PueblosComponent,
  DashboardComponent,
  HeaderComponent,
  SidebarComponent,
  CreatePueblosComponent
];

@NgModule({
  imports: [
    PagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgxSpinnerModule,
    NgProgressModule,
    NgProgressRouterModule.withConfig({
      startEvents: [GuardsCheckStart, NavigationStart],
      completeEvents: [NavigationEnd, NavigationError, NavigationCancel],
      id: "progresBar"
    }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAsbC9LhwM5QEi8xaJ26verzmC7832rQAo'
    })
  ],
  declarations: [...PAGES_COMPONENTS],
  providers: []
})
export class PagesModule {}
