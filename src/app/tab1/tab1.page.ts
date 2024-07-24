import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public title:string = '';

  constructor(private router: Router, private modalCtrl: ModalController) {}
  
  profilePage() {
    this.router.navigate(['/profile']);
  }

}
