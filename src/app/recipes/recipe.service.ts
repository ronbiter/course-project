import { EventEmitter, Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';

import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {

  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'A Tasty Schnitzel'
      ,'This is simply a test'
      ,'http://maxpixel.freegreatpicture.com/static/photo/1x/Meat-Power-Recipe-Food-Dishes-Pork-1459693.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 10)
      ]),
    new Recipe(
      'A Test Recipe 2'
      ,'This is simply a test 2'
      ,'http://maxpixel.freegreatpicture.com/static/photo/1x/Meat-Power-Recipe-Food-Dishes-Pork-1459693.jpg',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 4)
      ])
  ];

  constructor(private SLService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToSL(ingredients: Ingredient[]) {
      this.SLService.addIngredients(ingredients);
  }

}
