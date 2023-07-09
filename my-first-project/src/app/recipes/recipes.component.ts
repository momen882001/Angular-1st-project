import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from '../services/recipes.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeService]
})
export class RecipesComponent implements OnInit , OnDestroy {

  recipes : Recipe[];
  recipesSub : Subscription;


 constructor(private recipeService : RecipeService) {}

 ngOnInit(): void {
  // this.recipesSub = this.recipeService.recipesUpdated.subscribe( (recipes : Recipe[]) => {
  //   this.recipes = recipes;
  // })
 }

 ngOnDestroy(): void {
  this.recipesSub.unsubscribe();
}

}
