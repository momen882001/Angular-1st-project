import { Injectable } from '@angular/core';
import { Ingredients } from '../shared/ingredients.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ShoppingListService {
  constructor(private http: HttpClient) {}

  editId = new Subject<string>();

  postIngredient(ingredient: Ingredients) {
    this.http
      .post(
        'https://ng-first-project-a26d1-default-rtdb.firebaseio.com/shoppingList.json',
        ingredient
      )
      .subscribe((resData) => {
        console.log(resData);
        window.location.reload();
      });
  }

  fetchingIngredients() {
    return this.http
      .get(
        'https://ng-first-project-a26d1-default-rtdb.firebaseio.com/shoppingList.json'
      )
      .pipe(
        map((responseData) => {
          const resultIngredientsArray: Ingredients[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              resultIngredientsArray.push({ ...responseData[key], id: key });
            }
          }
          return resultIngredientsArray;
        })
      );
  }

  getIngredient(id: string) {
    return this.http.get(
      `https://ng-first-project-a26d1-default-rtdb.firebaseio.com/shoppingList/${id}.json`
    )
  }

  updateIngredient(id: string, newIngredient: Ingredients) {
   this.http.put(
      `https://ng-first-project-a26d1-default-rtdb.firebaseio.com/shoppingList/${id}.json`,
      newIngredient
    ).subscribe((resData : Ingredients[]) => {
      console.log(resData);
      window.location.reload()
    })
  }

  deleteIngredient(id: string) {
    return this.http
      .delete(
        `https://ng-first-project-a26d1-default-rtdb.firebaseio.com/shoppingList/${id}.json`
      )
      .subscribe((res) => {
        console.log(res);
        window.location.reload()
      });
  }
}
