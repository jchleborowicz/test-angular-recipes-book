import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../../services/shopping-list.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f') form: NgForm;

  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        const editedItem = this.shoppingListService.getIngredient(index);
        this.setFormValues(editedItem);
      }
    );
  }

  setFormValues(ingredient: Ingredient) {
    if (ingredient) {
      this.form.setValue({
        'name': ingredient.name,
        'amount': ingredient.amount
      });
    } else {
      this.form.reset();
    }
  }

  getFormValues(): Ingredient {
    const value = this.form.value;

    const ingredientName = value['name'];
    const ingredientAmount = value['amount'];

    return new Ingredient(ingredientName, ingredientAmount);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit() {
    const ingredient = this.getFormValues();

    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, ingredient);
    } else {
      this.shoppingListService.addIngredient(ingredient);
    }
    this.clear();
  }

  clear() {
    this.editMode = false;
    this.setFormValues(null);
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.clear();
  }
}
