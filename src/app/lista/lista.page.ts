import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss'],
})
export class ListaPage  {

  constructor(private storage: Storage) { }
  lista:any[] = []
  alumno = "Juan Perez"

  async ngOnInit() {
    await this.storage.create();
  }
  async ionViewDidEnter() {
    this.lista = await this.storage.get("lista") || [];
  }
}
