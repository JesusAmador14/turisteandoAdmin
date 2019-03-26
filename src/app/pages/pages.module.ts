import { NgModule } from "@angular/core";

import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { PagesRoutingModule } from "./pages-routing.module";
import { EscritoresComponent } from "./escritores/escritores.component";
import { PueblosComponent } from "./pueblos/pueblos.component";
import { HeaderComponent } from "../components/header/header.component";
import { SidebarComponent } from "../components/sidebar/sidebar.component";

const PAGES_COMPONENTS = [
  PagesComponent,
  EscritoresComponent,
  PueblosComponent,
  DashboardComponent,
  HeaderComponent,
  SidebarComponent
];

@NgModule({
  imports: [PagesRoutingModule],
  declarations: [...PAGES_COMPONENTS]
})
export class PagesModule {}
