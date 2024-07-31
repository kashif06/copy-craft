import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { ModalDataService } from 'src/app/services/modal-data.service';
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

  days: string[] = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  dayMonthPeriodOptions: number[] = []

  repeatFrequency: number = 1;
  selectedPeriod: string = 'week';
  selectedPeriodMonthDay: number = 1;
  selectedWeekDays: boolean[] = Array(7).fill(false);
  selectedTime: string | null = null;
  startDateSelect: string | null = null;  
  endsMode: string = 'never';
  endDateSelect: string | null = null;
  occurrences: number = 13;

  inputModel = '';
  title = '';
  description = '';

  @ViewChild('ionInputEl', { static: true }) ionInputEl!: IonInput;
  @ViewChild('ionInputEl2', { static: true }) ionInputEl2!: IonInput;

  taskForm!: FormGroup;
  isSaveDisabled: boolean = true;
  isDetailsVisible: boolean = false;
  starIcon: string = "assets/icon/star-outline.svg";
  starIconToggle: boolean = false;

  constructor(private modalCtrl: ModalController, private modalDataService: ModalDataService) { 
    this.dayMonthPeriodOptions = Array.from({ length: 30 }, (_, i) => i + 1);
  }

  ngOnInit() {
    const now = new Date();
    this.selectedPeriodMonthDay = now.getDate();
    this.selectedWeekDays[now.getDay()] = true;

    this.startDateSelect = now.toISOString();
    this.selectedTime = now.toISOString();
    // Add 3 months to the End date...
    now.setMonth(now.getMonth() + 3)
    this.endDateSelect = now.toISOString();
  }

  dateChanged(v:any) {
    console.log("date chage: ", v)
  }

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
    let data = {
      selectedPeriod: this.selectedPeriod,
      selectedWeekDays: this.selectedWeekDays,
      selectedTime: this.selectedTime,
      startDateSelect: this.startDateSelect,
      repeatFrequency: this.repeatFrequency,
      endDateSelect: this.endDateSelect,
      endsMode: this.endsMode,
      occurrences: this.occurrences
    };
    this.modalDataService.sendModalResponse({'repeatModalChange': data})
    this.modalCtrl.dismiss(data, 'confirm');
  }

  cancel() {
    this.closeModal();
  }

  toggleDay(day: number) {
    // const index = this.selectedWeekDays.indexOf(day);
    // if (index > -1) {
    //   this.selectedWeekDays.splice(index, 1);
    // } else {
    //   this.selectedWeekDays.push(day);
    // }
  }

  back() {
    this.modalCtrl.dismiss('onRepeatModalClose', 'onRepeatModalClose');
  }

  closeModal() {
    this.modalCtrl.dismiss(null, 'onRepeatModalClose');
  }

  handleSelectChange(e:any) {
    console.log('ionChange fired with value: ' + e.detail.value);
    this.selectedPeriod = e.detail.value;
  }

  handleEndEventChange(ev:any) {
    console.log('Current value:', JSON.stringify(ev.target.value));
  }

}
