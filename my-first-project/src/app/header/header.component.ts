import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorageService } from '../services/data-storage.service';
import { AuthService } from '../modules/auth/service/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthanticated: boolean;
  userSub: Subscription;
  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthanticated = !user ? false : true; // or using !!user
    });
  }

  onLogOut() {
    this.authService.logOut();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
