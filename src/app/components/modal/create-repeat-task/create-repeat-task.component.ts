import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import type { IonInput } from '@ionic/angular';

@Component({
  selector: 'app-create-repeat-task',
  templateUrl: './create-repeat-task.component.html',
  styleUrls: ['./create-repeat-task.component.scss'],
  imports: [CommonModule, IonicModule],
  standalone: true
})
export class CreateRepeatTaskComponent  implements OnInit {

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

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.name, 'confirm');
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

}
