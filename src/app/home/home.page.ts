import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router) {}


  goToqr(){
    this.router.navigate(['/qr'])
  }
  goTolista(){
    this.router.navigate(['/lista'])
  }

  goToinfo(){
    this.router.navigate(['/info'])
  }
  
}
