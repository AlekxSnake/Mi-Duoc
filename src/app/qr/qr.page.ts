import { AnimationController } from '@ionic/angular';
import { Component, ViewChild, ElementRef, OnInit} from '@angular/core';
import QRCode from 'easyqrcodejs';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QRPage implements OnInit {

  

  
  resultado: any

  @ViewChild('qrcode', { static: false }) private qrcode: ElementRef;
  qr: QRCode
  textoQR = "Texto de ejemplo"
	
async generarQR() {
    await new Promise(resolve => setTimeout(resolve, 200));
    let options = {
      text: this.textoQR,
      logo: "/assets/icon.png",
      logoBackgroundTransparent: true,
      title: "Escanee está presente",//Texto del titulo
      titleFont: "bold 26px Arial",//Fuente del titulo
      titleColor: "#00A2F2",//Color del texto del titulo
      titleBackgroundColor: "#ffffff",//Color de fondo del titulo
      titleHeight: 50,//El alto del espacio donde va el titulo
      titleTop: 25,//El espacio desde el borde al titulo
      width: 256,//Ancho (max256)
      height: 256,//Alto (max(256)
      colorDark: "#F78F8F",//Color de los puntitos
      colorLight: "#ffffff",//color de fondo
      quietZone: 10,//padding
      quietZoneColor: 'transparent',
      dotScale: .7,//Tamaño de los puntitos
      tooltip: false,
      crossOrigin: null,
    };
    if (this.qr) {
      this.qr.clear()
    }
    this.qr = new QRCode(this.qrcode.nativeElement, options);
  }
  
  animado = false

  constructor(private anim: AnimationController ,
    private animacionControl: AnimationController, 
    private storage: Storage, 
    private alert: AlertController) { } 
    lista:any[] = []
 


 //Crear animación por medio de funcion y obtiene parametro el id del elemento html
 animar2(id){
  this.animacionControl.create()
    .addElement(document.querySelector('#' + id))
    .duration(3000)
    .fromTo('color','Maroon','black')
    .fromTo('transform','translateX(-70px)','translateX(0px)')
    .iterations(1)
    .play();
}


  async ngOnInit() {
    await this.storage.create();
    this.lista = await this.storage.get("lista") || []
  }
  async leerQR () {
    
    await BarcodeScanner.checkPermission({ force: true });
  
    BarcodeScanner.hideBackground();
    document.querySelector('body')!.classList.add('scanner-active');
    const result = await BarcodeScanner.startScan(); 
  
    
    if (result.hasContent) {
      let res = result.content
      if(res.split("--").length !=2){
        this.presentAlert("Qr inválido!")
        return
      } 
      this.lista.push({
        ramo: res.split("--")[0],
        fecha: res.split("--")[1]
      })
      await this.storage.set("lista", this.lista)
    }

  };
  async detenerScanner() {
    BarcodeScanner.showBackground();
    document.querySelector('body')!.classList.remove('scanner-active');
    BarcodeScanner.stopScan();
  };
  async presentAlert(texto:string){
    const alert = await this.alert.create({
      header: 'Alert',
      subHeader: 'Important message',
      message: texto,
      buttons:['OK'],

    });
    await alert.present();
  }
  
}
