import {
  Component,
  ViewChild,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Ingredients } from 'src/app/shared/ingredients.model';
import { ShoppingListService } from '../../services/shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  editedFlag: boolean = false;
  editSubscription: Subscription;
  editedItem: Ingredients;
  idFirebase : string;

  constructor(private slService: ShoppingListService ) {}

  ngOnInit(): void {
    this.editSubscription = this.slService.editId.subscribe(
      (id: string) => {
        this.idFirebase = id;
        this.editedFlag = true;
        this.slService.getIngredient(id).subscribe((ingredient : Ingredients) => {
          this.editedItem = ingredient
          this.slForm.setValue({
            amount : this.editedItem.amount,
            name : this.editedItem.name
          });
        })
      }
    );
  }

  ngOnDestroy(): void {
    this.editSubscription.unsubscribe();
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredients(value.name, value.amount);
    if (this.editedFlag) {
      this.slService.updateIngredient(this.idFirebase, newIngredient);
    } else {
      this.slService.postIngredient(newIngredient);
    }
    this.editedFlag = false;
    form.reset();
  }

  onClearForm() {
    this.slForm.reset();
    this.editedFlag = false;
  }

  onDelete() {
    this.slService.deleteIngredient(this.idFirebase)
    this.onClearForm();
  }

}
