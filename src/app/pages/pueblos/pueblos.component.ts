import { Component, OnInit } from '@angular/core';
import { PuebloService } from '../../services/pueblos/pueblo.service';
import { Pueblo } from "../../models/pueblo/pueblo.model";
import { Observable } from 'rxjs';
@Component({
  selector: 'app-pueblos',
  templateUrl: './pueblos.component.html',
  styleUrls: ['./pueblos.component.css']
})
export class PueblosComponent implements OnInit {
  pueblos: Pueblo[];
  constructor(private puebloService: PuebloService) { }

  ngOnInit() {
    this.puebloService.getPueblos().subscribe(data => {
      this.pueblos = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Pueblo;
      });
      console.log(this.pueblos);
    });
  }
  delete(id:string){
    
  }


}
