import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CreateTaskComponent } from '../components/modal/create-task/create-task.component';
import { CreateTaskUpdatedComponent } from '../components/modal/create-task-updated/create-task-updated.component';

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

  async openCreateTaskModal() {
    const modal = await this.modalCtrl.create({
      component: CreateTaskUpdatedComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      // this.message = `Hello, ${data}!`;
    }
  }

}
