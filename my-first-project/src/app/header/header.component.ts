import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorageService } from '../services/data-storage.service';
import { AuthService } from '../modules/auth/service/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthanticated: boolean;
  userSub: Subscription;
  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService,
    private translateService : TranslateService
  ) {}

  lang : any


  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthanticated = !user ? false : true; // or using !!user
    });
    this.translateService.use(localStorage.getItem('language') || 'en')
    this.lang = localStorage.getItem('language') || 'en'
  }

  onLogOut() {
    this.authService.logOut();
  }

  translate(lang : any) {
    localStorage.setItem("language" , lang)
    this.translateService.use(lang)
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
