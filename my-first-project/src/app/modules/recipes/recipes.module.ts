import { SharedModule } from './../shared.module';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { RecipeDetailComponent } from "src/app/recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "src/app/recipes/recipe-edit/recipe-edit.component";
import { RecipeItemComponent } from "src/app/recipes/recipe-list/recipe-item/recipe-item.component";
import { RecipeListComponent } from "src/app/recipes/recipe-list/recipe-list.component";
import { RecipeStartComponent } from "src/app/recipes/recipe-start/recipe-start.component";
import { RecipesComponent } from "src/app/recipes/recipes.component";
import { RecipesRoutingModule } from "./recipes-routing.module";

@NgModule({
  declarations : [
    RecipesComponent,
    RecipeDetailComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeStartComponent,
    RecipeEditComponent,
  ],
  imports : [
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    RecipesRoutingModule,
    SharedModule
  ]
})
export class RecipesModule {

}
