import { Component, OnInit } from '@angular/core';
import { Ingredients } from '../shared/ingredients.model';
import { ShoppingListService } from '../services/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredients[];

  constructor(private slService: ShoppingListService) {}

  ngOnInit(): void {
    this.slService.fetchingIngredients().subscribe((resData: Ingredients[]) => {
      this.ingredients = resData;
      console.log(resData);
    });
  }

  onEditItem(ingredient: any) {
    this.slService.editId.next(ingredient.id);
  }
}
