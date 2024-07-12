import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [CommonModule, IonicModule],
  standalone: true
})
export class HeaderComponent  implements OnInit {

  @Input() title:string = '';

  constructor(private router: Router) { }

  ngOnInit() {}

  profilePage() {
    this.router.navigate(['/profile']);
  }

}
