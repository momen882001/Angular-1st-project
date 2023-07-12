import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DataStorageService } from 'src/app/services/data-storage.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  @Input() recipes: Recipe[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataStorageService: DataStorageService,
  ) {}

  ngOnInit(): void {
    this.dataStorageService.fetchingRecipes().subscribe((recipes) => {
      this.recipes = recipes;
      console.log(recipes);
    });
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
