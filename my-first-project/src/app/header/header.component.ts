import { Component, OnDestroy, OnInit} from "@angular/core";
import { DataStorageService } from "../services/data-storage.service";
import { AuthService } from "../services/auth.service";
import { Subscription } from "rxjs";

@Component({
    selector : "app-header",
    templateUrl : "./header.component.html"
})

export class HeaderComponent implements OnInit , OnDestroy {
  isAuthanticated : boolean
  userSub : Subscription;
  constructor(private dataStorageService : DataStorageService , private authService : AuthService){}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthanticated = !user ? false : true; // or using !!user
    })
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  // onFetchData() {
  //   this.dataStorageService.fetchRecipes();
  // }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

}
