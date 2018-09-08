import {Component, OnDestroy, OnInit} from '@angular/core';

import {Recipe} from '../../shared/recipe.model';
import {RecipesService} from '../../services/recipes.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipes: Recipe[] = [];
  private recipesChangedSubscription: Subscription;

  constructor(private recipeService: RecipesService) {
  }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
    this.recipesChangedSubscription = this.recipeService.recipesChanged.subscribe(value => this.recipes = value);
  }

  ngOnDestroy(): void {
    this.recipesChangedSubscription.unsubscribe();
  }

}
