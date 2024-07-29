import { Component, Input, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CreateRepeatTaskComponent } from '../create-repeat-task/create-repeat-task.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-task-datetime',
  templateUrl: './create-task-datetime.component.html',
  styleUrls: ['./create-task-datetime.component.scss'],
  imports: [CommonModule, IonicModule, FormsModule],
  standalone: true
})
export class CreateTaskDatetimeComponent  implements OnInit {

  @Input() date!: Date;
  @Input() time!: string;

  timeSelect:any;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  dismissModal() {
    this.modalCtrl.dismiss();
  }

  submitTask() {
    // Implement logic to handle task submission (e.g., save to database, close modal)
    // console.log('Task Submitted:', this.title, this.description); // Example log
    this.dismissModal();
  }

  async openRepeatModal() {
    const modal = await this.modalCtrl.create({
      component: CreateRepeatTaskComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      // this.message = `Hello, ${data}!`;
    }
  }

}
