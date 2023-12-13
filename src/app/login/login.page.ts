import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, AnimationController, NavController, Platform } from '@ionic/angular';
// import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Storage } from '@ionic/storage-angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  // private db: SQLiteObject;
  hide = true
  animado = false
  private usuario: string;
  private clave: string;

  constructor(
    // private sqlite: SQLite,
    private anim: AnimationController,
    private router: Router,
    private alert: AlertController,
    private nav: NavController,
    private platform: Platform,
    private storage: Storage
 )
  {
    // platform.ready().then(() => {
    //   this.sqlite.create({
    //     name: 'data.db',
    //     location: 'default'
    //   })
    //     .then((db: SQLiteObject) => {
    //       this.db = db;
    //       db.executeSql('create table Login(usuario VARCHAR(32), clave VARCHAR(32))', [])
    //         .then(() =>
    //           this.insertar()
    //         )
    //         .catch(e => console.log(e));
    //     })
    //     .catch(e => console.log(e));
    // })

  }

  async ngOnInit() {
    // If using a custom driver:
    // await this.storage.defineDriver(MyCustomDriver)
    await this.storage.create();
  }

  // select() {
  //   this.db.executeSql('SELECT usuario, clave FROM Login WHERE usuario = ? and clave = ?', [this.usuario, this.clave]).then((data) => {
  //     if (data.rows.length != 0) {
  //       this.router.navigate(['/home'])
  //     } else {
  //       this.presentAlert("datos incorrectos, <br>revisa y vuelve a intentarlo", "error")
  //     }
  //   }).catch(e => console.log(e));
  // }
  // ANIMACION
  animar() {
    if (!this.animado) {
      this.animado = true
      this.anim.create().duration(300)
        .addElement(document.querySelector(".header"))
        .fromTo("height", "30vh", "19vh")
        .fromTo("margin", "0px 0px 20px 0px", "0px 0px 78px 0px")
        .play()
    }
  }
  login() {
    if (this.usuario == 'admin' && this.clave == 'admin') {
      console.log("Ingresaste correctamente");
      this.router.navigate(['/home']); // Redirige a la página 'home'
    } else {
      this.animaInput("#clave");
    }
  }
  /*login(){
    if(this.usuario == "alexander" && this.clave == "123456"){
      let nav: NavigationExtras = {
        state : {
          usuario: this.usuario,
          clave: this.clave
        }
      }
      this.router.navigate(["/home"], nav)
    }else{
      this.presentAlert("datos incorrectos, <br>revisa y vuelve a intentarlo","error")
    }
  }*/
  limpiar() {
    this.usuario = ""
    this.clave = ""
  }

  async presentAlert(texto: string, titulo: string) {
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      header: titulo,
      // subHeader: 'Subtitle',
      message: texto,
      buttons: ['OK'],
    });

    await alert.present();

  }
  animaInput(input: string) {
    let usuario = document.querySelector(input) as HTMLInputElement;
    //usuario.focus();
    this.anim.create().addElement(usuario)
      .duration(100).iterations(3)
      .keyframes([
        { offset: 0, transform: 'rotate(-3deg)' },
        { offset: 0.5, transform: 'rotate(3deg)' },
        { offset: 1, transform: 'rotate(0)' },
      ]).play();
  }
}
