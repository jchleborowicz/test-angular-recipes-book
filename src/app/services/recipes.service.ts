import {Injectable} from '@angular/core';

import {Recipe} from '../shared/recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  private recipes: Recipe[] = [
    new Recipe('Hamburger', 'Very tasty hamburger',
      'https://www.maxpixel.net/static/photo/640/Sandwich-Meal-Lunch-Hamburger-Cheeseburger-Food-31775.jpg',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]),
    new Recipe('Celery salad', 'It\'s healthy and tasty!!!',
      'https://assets.bonappetit.com/photos/57ae36fc1b33404414975bc5/16:9/w_1280,c_limit/celery-salad-with-celery-root-and-horseradish.jpg',
      [
        new Ingredient('Celery', 2),
        new Ingredient('Onion', 3),
        new Ingredient('Carrot', 4)
      ])
  ];

  recipesChanged = new Subject<Recipe[]>();

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  getByIndex(index: number) {
    return this.recipes[index];
  }

  /*
   * Returns new recipe id.
   */
  addRecipe(recipe: Recipe): number {
    this.recipes.push(recipe);
    this.fireRecipesChanged();
    return this.recipes.length - 1;
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.fireRecipesChanged();
  }

  private fireRecipesChanged() {
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(recipeId: number) {
    this.recipes.splice(recipeId, 1);
    this.fireRecipesChanged();
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.fireRecipesChanged();
  }
}
