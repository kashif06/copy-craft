import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CreateRepeatTaskComponent } from '../create-repeat-task/create-repeat-task.component';
import { ModalDataService } from 'src/app/services/modal-data.service';
import type { IonInput} from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { close, closeCircle, pin } from 'ionicons/icons';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
  imports: [CommonModule, IonicModule, FormsModule],
  standalone: true
})
export class CreateTaskComponent  implements OnInit {
  
  inputModel = '';
  title = '';
  description = '';
  isStarMarked = '';
  date: Date = new Date();
  time: string = this.formatTime(new Date());

  timeSelect:any;

  @ViewChild('ionInputEl', { static: true }) ionInputEl!: IonInput;
  @ViewChild('ionInputEl2', { static: false }) ionInputEl2!: IonInput;

  taskForm!: FormGroup;
  isSaveDisabled: boolean = true;
  isDetailsVisible: boolean = false;
  starIcon: string = "assets/icon/star-outline.svg";
  starIconToggle: boolean = false;

  constructor(private modalCtrl: ModalController, private fb: FormBuilder, private modalDataService: ModalDataService) { 

    this.modalDataService.getModalResponse().subscribe((res:any) => {
      console.log("RESPONSE GOT ", res);
    })

  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.ionInputEl.setFocus();
    }, 300);
  }

  onInputTitle(ev:any) {
    const value = ev.target!.value;
    this.isSaveDisabled = value == "";
    const filteredValue = value.replace(/[^a-zA-Z0-9]+/g, '');
    this.ionInputEl.value = this.title = filteredValue;
  }
  
  onInputDescription(ev:any) {
    const value = ev.target!.value;
    const filteredValue = value.replace(/[^a-zA-Z0-9]+/g, '');
    this.ionInputEl2.value = this.description = filteredValue;
  }


  dismissModal() {
    this.modalCtrl.dismiss();
  }

  submitTask() {
    // Implement logic to handle task submission (e.g., save to database, close modal)
    console.log('Task Submitted:', this.title, this.description); // Example log
    this.dismissModal();
  }

  toggleDetails() {
    this.isDetailsVisible = !this.isDetailsVisible;

    if (this.isDetailsVisible && this.ionInputEl2) {
      this.ionInputEl2.setFocus();
    }
  }

  toggleStar() {
    this.starIconToggle = !this.starIconToggle;

    this.starIcon = (this.starIconToggle == true) ? "assets/icon/star-filled.svg": "assets/icon/star-outline.svg";
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

  formatTime(date: Date): string {
    const minutes = date.getMinutes();
    const roundedMinutes = Math.round(minutes / 30) * 30;
    const hours = date.getHours();
    const formattedTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hours, roundedMinutes).toLocaleTimeString('en-US', { hour12: true, hour: 'numeric', minute: '2-digit' });
    return formattedTime;
  }

}
