import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  constructor(private authService : AuthService){}

  ngOnInit(): void {

  }

  isloginMode : boolean = false;
  isLoading : boolean = false;
  error : string = null;

  switchMode() {
    this.isloginMode = !this.isloginMode
  }

  onSubmit( form : NgForm) {

    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;
    if (this.isloginMode) {
      //...
    }else {
      this.authService.SignUp(email, password).subscribe(
        responseData => {
          console.log(responseData);
          this.isLoading = false;
        },
        error => {
          console.log(error);
          this.error = 'Failed! There is an error'
          this.isLoading = false;
        }
      )
    }

    form.reset()
  }

}
