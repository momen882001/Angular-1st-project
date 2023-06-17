import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

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
    this.error = null;
  }

  onSubmit( form : NgForm) {

    const email = form.value.email;
    const password = form.value.password;

    let authObs : Observable<AuthResponseData>;

    this.isLoading = true;
    if (this.isloginMode) {
     authObs = this.authService.Login(email, password)
    }else {
     authObs = this.authService.SignUp(email, password)
    }

    authObs.subscribe(
      responseData => {
        console.log(responseData);
        this.isLoading = false;
        this.error = null;
      },
      errMesage => {
        this.error = errMesage
        this.isLoading = false;
      }
    )

    form.reset()
  }

}
