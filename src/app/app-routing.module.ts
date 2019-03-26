import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./auth/login/login.component";

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "",
    loadChildren: "./pages/pages.module#PagesModule"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
