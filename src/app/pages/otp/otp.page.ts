import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit {

  constructor(private alertController: AlertController, private router: Router) { }

  ngOnInit() {
  }

  async confirm() {
    const alert = await this.alertController.create({
      // header: 'Your OTP is confirmed!',
      subHeader: 'Your OTP is confirmed!',
      // message: 'Your OTP is confirmed!',
      buttons: [
        {
          text: 'OK',
          handler: (data: any) => {
            this.router.navigate(['/login'])
          }
        },
      ],
    });

    await alert.present();
  }

  async resendOTP() {
    const alert = await this.alertController.create({
      mode: 'ios',
      header: 'OTP Resent',
      // subHeader: 'Your OTP is confirmed!',
      message: 'Please check your spam if needed',
      buttons: [
        {
          text: 'OK',
          handler: (data: any) => {
            
          }
        },
      ],
    });

    await alert.present();
  }

  goToLogin() {
    this.router.navigate(['/login'])
  }

}
