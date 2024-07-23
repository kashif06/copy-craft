import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CreateRepeatTaskComponent } from '../create-repeat-task/create-repeat-task.component';
import type { IonInput } from '@ionic/angular';

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
  date: any;
  timeSelect:any;

  @ViewChild('ionInputEl', { static: true }) ionInputEl!: IonInput;
  @ViewChild('ionInputEl2', { static: true }) ionInputEl2!: IonInput;

  taskForm!: FormGroup;
  isSaveDisabled: boolean = true;
  isDetailsVisible: boolean = false;
  starIcon: string = "assets/icon/star-outline.svg";
  starIconToggle: boolean = false;

  constructor(private modalCtrl: ModalController, private fb: FormBuilder) { }

  ngOnInit() {
    this.date = (new Date()).toISOString();

    // this.taskForm = this.fb.group({
    //   title: ['', Validators.required],
    //   description: [''],
    //   bookmarked: [null],
    // });
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
    // this.ionInputEl2.value = this.description = filteredValue;
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
  }

  toggleStar() {
    this.starIconToggle = !this.starIconToggle;

    this.starIcon = (this.starIconToggle == true) ? "assets/icon/star-filled.svg": "assets/icon/star-outline.svg";
  }

  async openModal() {
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
