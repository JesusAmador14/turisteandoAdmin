import { Injectable } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: "root"
})
export class GastronomiaService {
  images = [];
  imageUrl;
  constructor(
    private firestore: AngularFirestore,
    private _storage: AngularFireStorage
  ) {}
  crearGastronomia(data, files) {
    for (let i = 0; i < files.length; i++) {
      this.images.push(files[i].name);
    }
    return this.firestore
      .collection("gastronomia")
      .add(data)
      .then(res => {
        // tslint:disable-next-line: variable-name
        const _id = res.id;

        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < files.length; i++) {
          // Se crea la ruta de reerencia de la imagen
          const filepath = `gastronomia/${_id}/${files[i].name}`;
          const fileRef = this._storage.ref(filepath);
          // se guarda la imagen en el storage de firebase
          const task = this._storage.upload(filepath, files[i]);
          task
            .snapshotChanges()
            .pipe(
              finalize(() => (this.imageUrl = fileRef.getDownloadURL()))
            )
            .subscribe();
        }
        this.firestore
          .collection("gastronomia")
          .doc(_id)
          .update({
            images: this.images
          });
      });
  }

  //Devuelve toda la colección "actividades"
  getActividades() {
    return this.firestore.collection("gastronomia").snapshotChanges();
  }

  getGastronomiaByPueblo(_id: string) {
    return this.firestore
      .collection("gastronomia", ref => ref.where("idPueblo", "==", _id))
      .snapshotChanges();
  }

  //Elimina una actividad según su identificador
  delete(id: string) {
    // var ref = this._storage.ref(`gastronomia/${id}`);
    
    // ref.delete();
    return this.firestore
      .collection("gastronomia")
      .doc(id)
      .delete();
  }
}
