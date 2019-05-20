import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./auth/login/login.component";
import { AngularFireModule } from "@angular/fire";
import { environment } from "../environments/environment";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
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
import { AuthService } from "./services/auth/auth.service";

@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, "Turisteando"),
    AngularFireAuthModule,
    AngularFirestoreModule.enablePersistence(),
    AngularFireStorageModule,
    FormsModule,
    ReactiveFormsModule,
    NgProgressModule.withConfig({
      spinner: true,
      spinnerPosition: "right",
      color: "red",
      thick: true,
      min: 20,
      meteor: true
    }),
    NgProgressRouterModule.withConfig({
      startEvents: [GuardsCheckStart, NavigationStart],
      completeEvents: [NavigationEnd, NavigationError, NavigationCancel],
      id: "progressBar",
      delay: 300
    })
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
