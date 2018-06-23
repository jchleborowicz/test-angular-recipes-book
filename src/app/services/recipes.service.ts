import {EventEmitter, Injectable} from '@angular/core';
import {Recipe} from '../shared/recipe.model';
import {Ingredient} from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  recipeSelected = new EventEmitter<Recipe>();

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

  constructor() {
  }

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

}
