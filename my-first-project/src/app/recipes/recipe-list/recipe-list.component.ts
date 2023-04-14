import { Component } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})

export class RecipeListComponent {
  recipes : Recipe[] = [
    new Recipe(
      "A test recipe",
      "This is a test recipe",
      "https://th.bing.com/th/id/OIP.nvjqMPhGIsmAdrF_XVjmDAHaEK?pid=ImgDet&rs=1"
      )
  ]
}
