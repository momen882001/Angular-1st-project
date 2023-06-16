import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";

const appRoutes : Routes = [
  {path : '' , redirectTo : '/auth' , pathMatch : 'full'},
  {path : 'auth', component : AuthComponent},
  {path : 'recipe', component : RecipesComponent , children : [
    {path : '' , component : RecipeStartComponent },
    {path : 'new' , component : RecipeEditComponent },
    {path : ':id' , component : RecipeDetailComponent },
    {path : ':id/edit' , component : RecipeEditComponent },
  ]},
  {path : 'shoppinglist' , component : ShoppingListComponent},
]

@NgModule({
  imports : [
    RouterModule.forRoot(appRoutes)
  ],
  exports : [
    RouterModule
  ]
})
export class RoutingModuleApp {

}