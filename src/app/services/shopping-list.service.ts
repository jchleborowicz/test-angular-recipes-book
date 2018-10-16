import {Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  ingredientsChanged = new Subject<void>();
  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];

  addIngredient(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next();
  }

  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  addIngredients(newIngredients: Ingredient[]) {
    this.ingredients.push(...newIngredients);
    this.fireIngredientsChanged();
  }

  updateIngredient(index: number, ingredient: Ingredient) {
    this.ingredients[index] = ingredient;
    this.fireIngredientsChanged();
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.fireIngredientsChanged();
  }

  private fireIngredientsChanged() {
    this.ingredientsChanged.next();
  }

  setIngredients(ingredients: Ingredient[]) {
    this.ingredients = ingredients;
    this.fireIngredientsChanged();
  }

}
