import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth/auth.service";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit {
  name: string;
  email: string;
  nivel: string;
  public user: [];
  constructor(public auth: AuthService) {}
  logOut() {
    this.auth
      .logOut()
      .then(res => {})
      .catch(err => {});
  }

  ngOnInit() {
    let uid = JSON.parse(localStorage.getItem("user"));
    this.auth.runDataUser(uid["uid"]).then(res => {
      this.user = this.auth.getData();
      this.name = this.user["displayName"];
      this.email = this.user["email"];
    });
  }
}
