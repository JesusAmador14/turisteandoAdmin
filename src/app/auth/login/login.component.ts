import { Component, OnInit, NgZone } from "@angular/core";
import { AuthService } from "../../services/auth/auth.service";
import { Router } from "@angular/router";
import { NgForm, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NgProgressRef, NgProgress } from "@ngx-progressbar/core";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  email: string;
  password: string;
  progressRef: NgProgressRef;
  constructor(
    private auth: AuthService,
    private ng: NgZone,
    private route: Router,
    private formBuilder: FormBuilder,
    private progress: NgProgress
  ) {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });
  }

  loginEmailandPassword() {
    this.progressRef.start();
    this.auth
      .loginWithEmailandPassword(this.email, this.password)
      .then(res => {
        this.progressRef.complete();
        //redirecciona al dashboard si el logueo esta correcto
        this.ng.run(() => {
          this.route.navigate(["dashboard"]);
          this.progressRef.complete();
        });
      })
      .catch(err => {
        this.progressRef.complete();
        alert("Usuario o contraseña incorrectos");
        this.email = "";
        this.password = "";
        this.progressRef.complete();
        console.log(err);
      });
    }
  ngOnInit() {
    this.progressRef = this.progress.ref("progressBar");
  }
}
