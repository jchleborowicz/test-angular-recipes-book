import {Component, OnInit} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShopingListService} from '../services/shoping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredient[] = [];

  constructor(private shoppingListService: ShopingListService) {
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
