import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { CreateTaskComponent } from '../components/modal/create-task/create-task.component';
import { CreateRepeatTaskComponent } from '../components/modal/create-repeat-task/create-repeat-task.component';
import { Tab1PageRoutingModule } from './tab1-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
    CreateTaskComponent,
    CreateRepeatTaskComponent
  ],
  declarations: [Tab1Page]
})
export class Tab1PageModule {}
