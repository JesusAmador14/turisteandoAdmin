import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PuebloService {
  pueblo;
  pueblos = [];
  imageUrl;
  images = [];
  constructor(private firestore: AngularFirestore, private _storage: AngularFireStorage) { }

  crearPueblo(data, files, lat, lng){
    this.pueblo = {nombre: data.nombre, estado: data.estado, descripcion: data.descripcion, lat: lat, lng: lng};

    return this.firestore.collection('pueblos').add(this.pueblo).then(fun => {
      const id = fun.id;
      if (files.length > 0) {
        for(let i=0; i < files.length; i++) {
          const randomId = Math.random().toString(36).substring(2);
          const filepath = `pueblos/${id}/${files[i].name}`;
          const fileRef = this._storage.ref(filepath);
          const task = this._storage.upload(filepath, files[i]);
          task.snapshotChanges().pipe(
            finalize(() => this.imageUrl = fileRef.getDownloadURL())
          ).subscribe();
          this.images.push(files[i].name);
        }
        console.log(id);
        this.firestore.collection('pueblos').doc(id).update({
          nombre: data.nombre, 
          estado: data.estado, 
          descripcion: data.descripcion, 
          lat: lat, 
          lng: lng,
          images: this.images
        });
      }
    });
  }

  getPueblos(){
    return this.firestore.collection('pueblos').snapshotChanges();
  }
}
