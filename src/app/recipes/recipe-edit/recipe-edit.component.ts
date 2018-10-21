import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AbstractControl, FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {RecipesService} from '../../services/recipes.service';
import {Recipe} from '../../shared/recipe.model';
import {Ingredient} from '../../shared/ingredient.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private recipeService: RecipesService) {
  }

  private static createIngredientsFormGroup(ingredient): FormGroup {
    return new FormGroup({
      'name': new FormControl(ingredient.name, Validators.required),
      'amount': new FormControl(ingredient.amount, [
        Validators.required,
        Validators.pattern(/^[1-9]\d*$/)
      ])
    });
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
  }

  private initForm() {
    if (this.editMode) {
      const recipe: Recipe = this.recipeService.getByIndex(this.id);
      this.setValues(recipe);
    } else {
      this.setValues(null);
    }
  }

  private setValues(recipe: Recipe) {
    if (!recipe) {
      recipe = new Recipe();
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipe.name, Validators.required),
      'imagePath': new FormControl(recipe.imagePath, Validators.required),
      'description': new FormControl(recipe.description, Validators.required),
      'ingredients': new FormArray(
        recipe.ingredients.map(it => RecipeEditComponent.createIngredientsFormGroup(it))
      )
    });
  }

  ingredientControls(): AbstractControl[] {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  private getValues(): Recipe {
    return this.recipeForm.value;
  }

  onSubmit() {
    const recipe = this.getValues();

    let targetId: number;

    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, recipe);
      targetId = this.id;
    } else {
      targetId = this.recipeService.addRecipe(recipe);
    }

    this.router.navigate(['/recipes', targetId]);
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(RecipeEditComponent.createIngredientsFormGroup(new Ingredient(null, null)));
  }

  onCancel() {
    this.router.navigate(['..'], {relativeTo: this.route});
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
}
