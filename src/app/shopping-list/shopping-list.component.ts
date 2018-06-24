import {Component, OnInit} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../services/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredient[] = [];

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit(): void {
    this.reloadIngrediens();
    this.shoppingListService.ingredientsChanged.subscribe(
      () => this.reloadIngrediens()
    );
  }

  private reloadIngrediens() {
    this.ingredients = this.shoppingListService.getIngredients();
  }

}
