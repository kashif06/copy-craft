import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import type { IonInput } from '@ionic/angular';

interface RepeatOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-create-repeat-task',
  templateUrl: './create-repeat-task.component.html',
  styleUrls: ['./create-repeat-task.component.scss'],
  imports: [CommonModule, IonicModule, FormsModule],
  standalone: true
})

export class CreateRepeatTaskComponent  implements OnInit {

  public datetime!:any;

  selectedDays: string[] = [];
  repeatOption: RepeatOption = { value: '1', label: '1 week' };
  selectedTime: string = '';
  startDate: any = '2024-07-23';
  endDate: Date | null = null;
  endsMode: string = 'never';
  occurrences: number = 0;
  days: string[] = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  selectedDay: string = 'M';
  selectedPeriod: string = 'week';

  name: string = '';

  inputModel = '';
  title = '';
  description = '';
  // startDate: any = "22 July";
  // endDate: any = "22 July";
  time:any = "01:00 pm";
  timeSelect:any;

  @ViewChild('ionInputEl', { static: true }) ionInputEl!: IonInput;
  @ViewChild('ionInputEl2', { static: true }) ionInputEl2!: IonInput;

  taskForm!: FormGroup;
  isSaveDisabled: boolean = true;
  isDetailsVisible: boolean = false;
  starIcon: string = "assets/icon/star-outline.svg";
  starIconToggle: boolean = false;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    const date = new Date();
    // Set the value of the datetime to 2 days
    // before the current day
    // let dayChange = -2;
    // If the day we are going to set the value to
    // is in the previous month then set the day 2 days
    // later instead so it remains in the same month
    // if (date.getDate() + dayChange <= 0) {
    //   dayChange = -dayChange;
    // }

    // Set the value of the datetime to the day
    // calculated above
    date.setMonth(date.getMonth() + 3)
    // date.setDate(date.getDate() + dayChange);
    this.datetime = date.toISOString();
  }

  // cancel() {
  //   return this.modalCtrl.dismiss(null, 'cancel');
  // }

  // confirm() {
  //   return this.modalCtrl.dismiss(this.name, 'confirm');
  // }

  onInputTitle(ev:any) {
    const value = ev.target!.value;
    this.isSaveDisabled = value == "";
    // Removes non alphanumeric characters
    const filteredValue = value.replace(/[^a-zA-Z0-9]+/g, '');
    this.ionInputEl.value = this.title = filteredValue;
  }
  
  onInputDescription(ev:any) {
    const value = ev.target!.value;
    // Removes non alphanumeric characters
    const filteredValue = value.replace(/[^a-zA-Z0-9]+/g, '');
    this.ionInputEl2.value = this.description = filteredValue;
  }

  confirm() {
    // Handle confirmed data here
    console.log('Selected data:', {
      repeatOption: this.repeatOption,
      selectedDays: this.selectedDays,
      selectedTime: this.selectedTime,
      startDate: this.startDate,
      endDate: this.endDate,
      endsMode: this.endsMode,
      occurrences: this.occurrences
    });
    this.modalCtrl.dismiss();
  }

  cancel() {
    this.modalCtrl.dismiss();
  }

  toggleDay(day: string) {
    const index = this.selectedDays.indexOf(day);
    if (index > -1) {
      this.selectedDays.splice(index, 1);
    } else {
      this.selectedDays.push(day);
    }
  }

  back() {
    this.modalCtrl.dismiss();
  }

  handleSelectChange(e:any) {
    console.log('ionChange fired with value: ' + e.detail.value);
    this.selectedPeriod = e.detail.value;
  }

  handleChange(ev:any) {
    console.log('Current value:', JSON.stringify(ev.target.value));
  }

}
