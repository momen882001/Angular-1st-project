import {
  Component,
  ElementRef,
  Output,
  ViewChild,
  EventEmitter,
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
  elementIndex: number;
  editedFlag: boolean = false;
  editSubscription: Subscription;
  editedItem: Ingredients;

  constructor(private slService: ShoppingListService) {}

  ngOnInit(): void {
    this.editSubscription = this.slService.editElIndex.subscribe(
      (index: number) => {
        this.elementIndex = index;
        this.editedFlag = true;
        this.editedItem = this.slService.getIngredient(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        });
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
      this.slService.updateIngredient(this.elementIndex, newIngredient);
    } else {
      this.slService.pushIngredient(newIngredient);
    }
    this.editedFlag = false;
    form.reset();
  }

  onClearForm() {
    this.slForm.reset();
    this.editedFlag = false;
  }

  onDelete() {
    this.slService.deleteIngredient(this.elementIndex);
    this.onClearForm();
  }

}
