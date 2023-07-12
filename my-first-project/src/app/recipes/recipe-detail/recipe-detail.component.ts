import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataStorageService } from 'src/app/services/data-storage.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  RecipeToDetails: Recipe;
  id: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.dataStorageService.getRecipe(this.id).subscribe((recipe: Recipe) => {
        this.RecipeToDetails = recipe;
        console.log(this.RecipeToDetails);
      });
    });
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteRecipe() {
    this.dataStorageService.deleteRecipe(this.id).subscribe((resData) => {
      console.log(resData);
      window.location.reload();
    });
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
