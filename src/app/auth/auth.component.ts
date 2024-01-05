import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnInit {

  @Output() onSubmitEvent = new EventEmitter();
  @Input() submitLabel:string;

  email  = new FormControl('',[Validators.required, Validators.email]);
  password = new FormControl('',[Validators.required]);
  

  ngOnInit(): void {
    
  }

  constructor() {
    
  }

  getEmailErrorMessage(){
      if(this.email.hasError('required')){
        return 'You must enter a value';
      }
      return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage() {
    if (this.password.hasError('required')) {
      return 'You must enter a value.';
    }

    return '';
  }

  onSubmit() {
    this.onSubmitEvent.emit({
      email: this.email.value,
      password: this.password.value,
    });
  }
}
