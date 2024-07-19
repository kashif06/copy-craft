import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, IonInput, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-create-task-updated',
  templateUrl: './create-task-updated.component.html',
  styleUrls: ['./create-task-updated.component.scss'],
  imports: [CommonModule, IonicModule, FormsModule],
  standalone: true
})
export class CreateTaskUpdatedComponent  implements OnInit {

  name: string = '';
  title: string = '';
  description: string = '';
  isImportant: boolean = false;

  isSaveDisabled: boolean = true;
  starIcon: string = "assets/icon/star-outline.svg";
  starIconToggle: boolean = false;

  @ViewChild('ionInputEl', { static: true }) ionInputEl!: IonInput;
  @ViewChild('ionInputEl2', { static: true }) ionInputEl2!: IonInput;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

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
    // this.ionInputEl2.value = this.description = filteredValue;
  }

  toggleStar() {
    this.starIconToggle = !this.starIconToggle;
    this.starIcon = (this.starIconToggle == true) ? "assets/icon/star-filled.svg": "assets/icon/star-outline.svg";
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.name, 'confirm');
  }

}
