import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  id: string;
  editMode: boolean = false;
  recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private dataStorageRecipes: DataStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
      // console.log(this.editMode);
    });
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onSubmit() {
    if (this.editMode) {
      this.dataStorageRecipes.updateRecipe(this.id, this.recipeForm.value);
      this.router.navigate(['../'], { relativeTo: this.route });
    } else {
      this.dataStorageRecipes.postRecipe(this.recipeForm.value);
      this.router.navigate(['../'], { relativeTo: this.route });
    }
  }

  onCancelRecipeForm() {
    this.router.navigate(['/recipe']);
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }

  getControls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      this.dataStorageRecipes.getRecipe(this.id).subscribe((recipe: Recipe) => {
        console.log(recipe);
        recipeName = recipe.name;
        recipDescription = recipe.description;
        recipeImagePath = recipe.imagePath;
        if (recipe['ingredients']) {
          for (let ingredient of recipe.ingredients) {
            recipeIngredients.push(
              new FormGroup({
                name: new FormControl(ingredient.name, Validators.required),
                amount: new FormControl(ingredient.amount, [
                  Validators.required,
                  Validators.pattern(/^[1-9]+[0-9]*$/),
                ]),
              })
            );
          }
        }

        this.recipeForm = new FormGroup({
          name: new FormControl(recipeName, Validators.required),
          imagePath: new FormControl(recipeImagePath, Validators.required),
          description: new FormControl(recipDescription, Validators.required),
          ingredients: recipeIngredients,
        });
      });
    }
    // for testing , it will be improved
    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      description: new FormControl(recipDescription, Validators.required),
      ingredients: recipeIngredients,
    });
  }
}
