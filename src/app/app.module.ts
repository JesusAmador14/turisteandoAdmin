import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./auth/login/login.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { PueblosComponent } from "./pages/pueblos/pueblos.component";
import { EscritoresComponent } from "./pages/escritores/escritores.component";
import { AdministradoresComponent } from "./pages/administradores/administradores.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { AngularFireModule } from "@angular/fire";
import { environment } from "../environments/environment";
import { from } from "rxjs";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    PueblosComponent,
    EscritoresComponent,
    AdministradoresComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, "Turisteando")
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
