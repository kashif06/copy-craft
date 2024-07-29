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
  public dateTime;
  public dateTimeISO;

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

    const date = new Date();
    this.dateTime = this.roundToNextHour(date);
    this.dateTimeISO = this.toLocalISOString(this.dateTime);

  }

  roundToNextHour(date: Date): Date {
    date.setMinutes(0, 0, 0); // Set minutes, seconds, milliseconds to 0
    date.setHours(date.getHours() + 1); // Increment hour by 1
    return date;
  }

  toLocalISOString(date: Date): string {
    const tzoffset = date.getTimezoneOffset() * 60000; // offset in milliseconds
    const localISOTime = (new Date(date.getTime() - tzoffset)).toISOString().slice(0, -1);
    return localISOTime + 'Z'; // Append 'Z' to indicate UTC
  }

  ngOnInit(): void {
    
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
    console.log('Task Submitted:', this.title, this.description, this.dateTime); // Example log
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

  formatTime(date: Date, isIsoFormat: boolean): string {
    const minutes = date.getMinutes();
    const roundedMinutes = 60; // Set minutes to 0 for the next hour
    date.setMinutes(0,0);
    date.setHours(date.getHours());

    if(isIsoFormat) {
      return date.toISOString();
    }
    return date.toLocaleTimeString('en-US', { hour12: true, hour: 'numeric', minute: '2-digit' });
  }

  onTimeChange(newTime: any) {
    console.log(newTime);
    this.dateTimeISO = newTime;
    this.dateTime = new Date(newTime);
  }

}
