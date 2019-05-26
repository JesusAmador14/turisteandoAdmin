import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";

import { Observable } from "rxjs";
import { AngularFireStorage } from "@angular/fire/storage";
import { finalize } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})

/*************** MODELO DE PUEBLOS *****************/
export class PuebloService {
  pueblo;
  pueblos = [];
  imageUrl;
  images = [];
  _id: string;
  constructor(
    private firestore: AngularFirestore,
    private _storage: AngularFireStorage
  ) {}

  //inserta un nuevo pueblo
  crearPueblo(data, files, lat, lng) {
    //Se crea un objeto con la información del pueblo a crear
    this.pueblo = {
      nombre: data.nombre,
      estado: data.estado,
      descripcion: data.descripcion,
      lat: lat,
      lng: lng
    };

    return this.firestore
      .collection("pueblos")
      .add(this.pueblo)
      .then(fun => {
        const id = fun.id;
        //Se ejecuta si es que se subieron imagenes
        if (files.length > 0) {
          //recorre cada imagen subida
          for (let i = 0; i < files.length; i++) {
            //Se crea la ruta de reerencia de la imagen
            const filepath = `pueblos/${id}/${files[i].name}`;
            const fileRef = this._storage.ref(filepath);
            //se guarda la imagen en el storage de firebase
            const task = this._storage.upload(filepath, files[i]);
            task
              .snapshotChanges()
              .pipe(finalize(() => (this.imageUrl = fileRef.getDownloadURL())))
              .subscribe();
            //se guarda el nombre de la imagen en un arreglo
            this.images.push(files[i].name);
          }
          //Se actualiza el documento con la reerencia de las imagenes
          this.firestore
            .collection("pueblos")
            .doc(id)
            .update({
              nombre: data.nombre,
              estado: data.estado,
              descripcion: data.descripcion,
              lat: lat,
              lng: lng,
              images: this.images,
              visitas: 0
            });
        }
      });
  }

  //Devuelve toda la colección "pueblos"
  getPueblos() {
    return this.firestore.collection("pueblos").snapshotChanges();
  }

  //Elimina un pueblo según su identificador
  delete(id: string) {
    return this.firestore
      .collection("pueblos")
      .doc(id)
      .delete();
  }

  //Devuelve la inormación de un pueblo
  getPueblo(id: string) {
    return this.firestore
      .collection("pueblos")
      .doc(id).get();
  }
}
