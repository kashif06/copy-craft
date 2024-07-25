import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  @ViewChild('modal', { static: false }) modalContent!: ElementRef;

  public title:string = '';

  constructor(private router: Router, private modalCtrl: ModalController, private platform: Platform) {
    
    
  }

  ngAfterViewInit() {
    // this.platform.keyboardDidShow.subscribe(ev => {
    //   const { keyboardHeight } = ev;
    //   this.modalContent.nativeElement.style.paddingBottom = `${keyboardHeight}px`;
    //   console.log("keyboardDidShow 2");
    //   // Do something with the keyboard height such as translating an input above the keyboard.
    // });

    // this.platform.keyboardDidHide.subscribe(() => {
    //   // Move input back to original location
    //   console.log("keyboardDidHide 2");
    //   this.modalContent.nativeElement.style.paddingBottom = '0';
    // });

  }
  
  profilePage() {
    this.router.navigate(['/profile']);
  }

}
