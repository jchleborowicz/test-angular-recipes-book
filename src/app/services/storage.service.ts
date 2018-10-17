import {Injectable} from '@angular/core';
import {ShoppingListService} from './shopping-list.service';
import {RecipesService} from './recipes.service';
import {Recipe} from '../shared/recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private serviceUrl = 'https://ng-recipe-book-a5708.firebaseio.com/data.json';

  constructor(private http: HttpClient,
              private shoppingListService: ShoppingListService,
              private recipesService: RecipesService,
              private authService: AuthService) {
  }

  saveData(): Observable<any> {
    const recipes: Recipe[] = this.recipesService.getRecipes();
    const ingredients: Ingredient[] = this.shoppingListService.getIngredients();

    const data = {
      'recipes': recipes,
      'ingredients': ingredients
    };

    return this.http.put(this.createServiceUrl(), data);
  }

  fetchData(): Observable<any> {
    return this.http.get(this.createServiceUrl())
      .pipe(
        map(data => {
          const recipes: Recipe[] = data['recipes'];

          recipes.forEach(recipe => {
            if (!recipe.ingredients) {
              recipe.ingredients = [];
            }
          });

          this.recipesService.setRecipes(recipes);
          this.shoppingListService.setIngredients(data['ingredients']);
        })
      );
  }

  private createServiceUrl() {
    const token: string = this.authService.getToken();
    return this.serviceUrl + '?auth=' + token;
  }
}
