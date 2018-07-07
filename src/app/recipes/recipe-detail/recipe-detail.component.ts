import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';

import {Recipe} from '../../shared/recipe.model';
import {ShoppingListService} from '../../services/shopping-list.service';
import {RecipesService} from '../../services/recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;

  constructor(private recipesService: RecipesService,
              private shoppingListService: ShoppingListService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.recipe = this.recipesService.getByIndex(+params['id']);
        if (!this.recipe) {
          this.router.navigate([''], {relativeTo: this.route});
        }
      }
    );
  }

  addIngredientsToShoppingList() {
    this.shoppingListService.addIngredients(this.recipe.ingredients);
  }
}
