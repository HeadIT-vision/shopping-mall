import { Component } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  user = {
    email: null,
    password: null
  };

  constructor() {}

  onSubmit(user: any) {
    // this.toastr.show("User logged in successfully");
    console.log(user);
  }
}
