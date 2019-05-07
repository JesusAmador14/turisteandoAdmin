import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./auth/login/login.component";
import { AuthGuard } from "./services/guard/auth.guard";
import { SecureInnerPagesGuard } from "./services/guard/secure-inner-pages.guard";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const routes: Routes = [
  {
    path: "",
    redirectTo: "/login",
    pathMatch: "full"
  },
  {
    path: "login",
    component: LoginComponent,
    canActivate: [SecureInnerPagesGuard]
  },
  {
    path: "",
    loadChildren: "./pages/pages.module#PagesModule",
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
