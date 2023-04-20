import {
  Component,
  ElementRef,
  Output,
  ViewChild,
  EventEmitter,
} from '@angular/core';
import { Ingredients } from 'src/app/shared/ingredients.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent {
  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('amountInput') amountInputRef: ElementRef;
  @Output() ingredientDetails = new EventEmitter<Ingredients>();

  addItem() {
    const nameValue = this.nameInputRef.nativeElement.value;
    const amountValue = this.amountInputRef.nativeElement.value;
    if (nameValue !== '' && amountValue !== '') {
      const newIngredient = new Ingredients(nameValue, amountValue);
      this.ingredientDetails.emit(newIngredient);
    } else {
      alert('please fill all fields');
    }
  }
}
