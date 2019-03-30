import { Injectable, NgZone } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { User } from "../../services/user/user";
import { auth } from "firebase/app";
import {
  AngularFirestore,
  AngularFirestoreDocument,
  DocumentData
} from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
export interface Item {
  name: string;
}
@Injectable({
  providedIn: "root"
})
export class AuthService {
  private userData: any;
  public token: string;
  public userDoc: [];
  constructor(
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore,
    public route: Router,
    public ng: NgZone
  ) {
    this.setUp();
  }

  //Guarda datos del usuario en localStorage al iniciar sesión y los borra cuando sale
  setUp() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem("user", JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem("user"));
      } else {
        localStorage.setItem("user", null);
        JSON.parse(localStorage.getItem("user"));
      }
    });
  }

  //obtiene el documento del usuario logueado
  runDataUser(uid: string) {
    return this.afs.firestore
      .collection("usuarios")
      .doc(uid)
      .get()
      .then(doc => {
        if (doc.exists) {
          this.dataUserSave(doc.data());
        }
      });
  }

  //guarda en un arreglo los datos del usuario logueado
  dataUserSave(data) {
    this.userDoc = data;
  }

  //retorna los datos del usuario logueado
  getData() {
    return this.userDoc;
  }

  //Loguea con correo y contraeña
  loginWithEmailandPassword(email: string, password: string) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(res => Promise.resolve(res))
      .catch(err => Promise.reject(err));
  }
  //agrega la información del usuario que inicia sesión
  setUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `usuarios/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoUrl: user.photoUrl,
      level: user.level
    };
    return userRef.set(userData, {
      merge: true
    });
  }
  //cierra sesión
  logOut() {
    return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem("user");
      this.route.navigate(["login"]);
    });
  }

  //Decuelve true o false si alguien esta logueado
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem("user"));
    return user !== null ? true : false;
  }
}
