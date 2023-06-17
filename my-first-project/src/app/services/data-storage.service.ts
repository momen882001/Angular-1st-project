import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from './recipes.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put(
      'https://ng-first-project-a26d1-default-rtdb.firebaseio.com/recipes.json',
      recipes
    ).subscribe(
      resData => {
        console.log(resData);
      }
    )
  }
}
