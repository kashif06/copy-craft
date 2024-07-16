import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
  imports: [CommonModule, IonicModule],
  standalone: true
})
export class CreateTaskComponent  implements OnInit {

  taskForm!: FormGroup;

  constructor(private modalCtrl: ModalController, private fb: FormBuilder) { }

  ngOnInit() {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      dueDate: [null],
    });
    setTimeout(() => {
      this.focusAndOpenKeyword();
    }, 300);
  }

  focusAndOpenKeyword() {
    // let el:any = document.querySelector(".block > .swiper-slide-active");
    // let elInput = el.querySelector('.native-input') as HTMLElement || el.querySelector('.native-textarea') as HTMLElement;

    // if (elInput) {
    //   elInput.setAttribute('autofocus', 'autofocus');
    //   elInput.focus();
    //   elInput.click();
    // }
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }

  submitTask() {
    // Implement logic to handle task submission (e.g., save to database, close modal)
    console.log('Task Submitted:', this.taskForm.value); // Example log
    this.dismissModal();
  }

}
