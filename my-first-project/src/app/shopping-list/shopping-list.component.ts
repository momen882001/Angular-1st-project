import { Component, OnInit } from '@angular/core';
import { Ingredients } from '../shared/ingredients.model';
import { ShoppingListService } from '../services/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})

export class ShoppingListComponent implements OnInit {

  ingredients : Ingredients[];

  constructor(private slService : ShoppingListService) {}

  ngOnInit(): void {
    this.ingredients = this.slService.getIngredients();
    this.slService.ingredientsUpdated.subscribe(
      (ingredients  : Ingredients[]) => {
        this.ingredients = ingredients
      }
    )
  }

  onEditItem( index : number) {
    this.slService.editElIndex.next(index);
  }

}
