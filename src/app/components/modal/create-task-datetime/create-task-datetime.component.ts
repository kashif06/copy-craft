import { Component, Input, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CreateRepeatTaskComponent } from '../create-repeat-task/create-repeat-task.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalDataService } from 'src/app/services/modal-data.service';

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

  dateTime;
  dateTimeISO;
  dynamicYearValues: number[] = []
  
  constructor(private modalCtrl: ModalController, private modalDataService: ModalDataService) { 
    const date = new Date();
    this.dateTime = this.roundToNextHour(date);
    this.dateTimeISO = this.toLocalISOString(this.dateTime);
    this.generateYearValues(date);

    this.modalDataService.getModalResponse().subscribe((res:any) => {
      this.dismissModal();
      console.log("in side dateITme get")
    })

  }

  ngOnInit() {
  }

  generateYearValues(currentDate:Date) {
    const currentYear = currentDate.getFullYear();
    this.dynamicYearValues = Array.from({ length: 5 }, (_, index) => currentYear + index);
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

  dismissModal() {
    this.modalCtrl.dismiss();
  }

  submitTask() {
    // Implement logic to handle task submission (e.g., save to database, close modal)
    // console.log('Task Submitted:', this.title, this.description); // Example log
    this.dismissModal();
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

  onDateTimeChange(newTime: any) {
    this.dateTimeISO = newTime;
    this.dateTime = new Date(newTime);
    let data = {
      'dateTimeISO': this.dateTimeISO,
      'dateTime': this.dateTime,
    }
    this.modalDataService.sendModalResponse({'dateTimeChange': data})
  }

  async openRepeatModal() {
    const modal = await this.modalCtrl.create({
      component: CreateRepeatTaskComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    console.log(data, role)

    if (role === 'confirm') {
      // Handle confirmed data from repeat modal
    } else if (role === 'onRepeatModalClose') {
      const parentModal = await this.modalCtrl.getTop();
      if (parentModal) {
        await parentModal.dismiss();
      }
    }
  }

}
