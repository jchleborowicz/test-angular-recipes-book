import {Component, OnInit} from '@angular/core';

import {Recipe} from '../../shared/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [
    new Recipe('Hamburger', 'Very tasty hamburger',
      'https://www.maxpixel.net/static/photo/640/Sandwich-Meal-Lunch-Hamburger-Cheeseburger-Food-31775.jpg'),
    new Recipe('Celery salad', 'It\'s healthy and tasty!!!',
      'https://assets.bonappetit.com/photos/57ae36fc1b33404414975bc5/16:9/w_1280,c_limit/celery-salad-with-celery-root-and-horseradish.jpg')
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
