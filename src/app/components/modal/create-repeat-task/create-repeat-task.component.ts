import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
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
  imports: [CommonModule, IonicModule],
  standalone: true
})

export class CreateRepeatTaskComponent  implements OnInit {

  selectedDays: string[] = [];
  repeatOption: RepeatOption = { value: '1', label: '1 week' };
  selectedTime: string = '';
  startDate: Date = new Date();
  endDate: Date | null = null;
  endsMode: string = 'never';
  occurrences: number = 0;
  days: string[] = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  selectedDay: string = 'M';

  name: string = '';

  inputModel = '';
  title = '';
  description = '';
  date: any;

  @ViewChild('ionInputEl', { static: true }) ionInputEl!: IonInput;
  @ViewChild('ionInputEl2', { static: true }) ionInputEl2!: IonInput;

  taskForm!: FormGroup;
  isSaveDisabled: boolean = true;
  isDetailsVisible: boolean = false;
  starIcon: string = "assets/icon/star-outline.svg";
  starIconToggle: boolean = false;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

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

}
