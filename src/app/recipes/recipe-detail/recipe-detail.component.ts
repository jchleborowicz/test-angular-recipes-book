import {Component, Input} from '@angular/core';
import {Recipe} from '../../shared/recipe.model';
import {ShopingListService} from '../../services/shoping-list.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent {

  @Input() recipe: Recipe;

  constructor(private shoppingListService: ShopingListService) {
  }

  addIngredientsToShoppingList() {
    for (const ingredient of this.recipe.ingredients) {
      this.shoppingListService.addIngredient(ingredient);
    }
  }
}
