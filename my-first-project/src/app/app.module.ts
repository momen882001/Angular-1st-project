import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { ShoppingListService } from './services/shopping-list.service';
import { RoutingModuleApp } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './modules/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RoutingModuleApp,
    HttpClientModule,
    SharedModule,
  ],
  providers: [ShoppingListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
