import {EventEmitter, Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  ingredientsChanged = new EventEmitter<void>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];

  constructor() {
  }

  addIngredient(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.emit();
  }

  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  addIngredients(newIngredients: Ingredient[]) {
    for (const ingredient of newIngredients) {
      this.addIngredient(ingredient);
    }
  }
}
