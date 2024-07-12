import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router, public formBuilder: FormBuilder) { }

  ngOnInit() {
  }

  login() {
    this.router.navigate(['/tabs/tab1'], { replaceUrl: true })
  }

  goToRegister() {
    this.router.navigate(['/register'])
  }

}
