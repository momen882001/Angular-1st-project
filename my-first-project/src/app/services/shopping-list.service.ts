import { EventEmitter } from '@angular/core';
import { Ingredients } from '../shared/ingredients.model';
import { Subject } from 'rxjs';

export class ShoppingListService {
  ingredientsUpdated = new Subject<Ingredients[]>();
  editElIndex = new Subject<number>();

  private ingredients: Ingredients[] = [
    new Ingredients('Apples', 5),
    new Ingredients('Tomatoes', 10),
  ];

  getIngredients() {
    return this.ingredients.slice(); // make a copy
    // return this.ingredients; // instead of ingredientsUpdated
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  updateIngredient(index: number , newIngredient : Ingredients) {
    this.ingredients[index] = newIngredient;
    this.ingredientsUpdated.next(this.ingredients);
  }

  deleteIngredient(index : number) {
    this.ingredients.splice(index, 1);
    this.ingredientsUpdated.next(this.ingredients);
  }

  pushIngredient(ingredient: Ingredients): void {
    this.ingredients.push(ingredient);
    this.ingredientsUpdated.next(this.ingredients);
  }
}
