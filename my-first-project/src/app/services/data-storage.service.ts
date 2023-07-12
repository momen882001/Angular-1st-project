import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
  ) {}

  postRecipe(recipe: Recipe) {
    this.http
      .post(
        'https://ng-first-project-a26d1-default-rtdb.firebaseio.com/recipesList.json',
        recipe
      )
      .subscribe((resData) => {
        console.log(resData);
        window.location.reload();
      });
  }

  fetchingRecipes() {
    return this.http
      .get(
        'https://ng-first-project-a26d1-default-rtdb.firebaseio.com/recipesList.json'
      )
      .pipe(
        map((responseData) => {
          const resultRecipesArray: Recipe[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              resultRecipesArray.push({ ...responseData[key], id: key });
            }
          }
          return resultRecipesArray;
        })
      );
  }

  getRecipe(id: string) {
    return this.http.get(
      `https://ng-first-project-a26d1-default-rtdb.firebaseio.com/recipesList/${id}.json`
    );
  }

  updateRecipe(id: string, newRecipe: Recipe) {
    this.http
      .put(
        `https://ng-first-project-a26d1-default-rtdb.firebaseio.com/recipesList/${id}.json`,
        newRecipe
      )
      .subscribe((resData) => {
        console.log(resData);
        window.location.reload();
      });
  }

  deleteRecipe(id: string) {
    return this.http.delete(
      `https://ng-first-project-a26d1-default-rtdb.firebaseio.com/recipesList/${id}.json`
    );
  }
}
