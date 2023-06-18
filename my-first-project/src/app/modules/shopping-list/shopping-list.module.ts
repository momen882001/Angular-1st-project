import { ShoppingListRoutingModule } from './shopping-list-routing.module';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { ShoppingEditComponent } from "src/app/shopping-list/shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "src/app/shopping-list/shopping-list.component";
import { SharedModule } from '../shared.module';

@NgModule({
  declarations : [
    ShoppingListComponent,
    ShoppingEditComponent,
  ],
  imports : [
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    ShoppingListRoutingModule,
    SharedModule
  ]
})
export class ShoppingListModule {

}
