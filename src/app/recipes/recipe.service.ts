import { EventEmitter, Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';

import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {

  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      1
      ,'A Tasty Schnitzel'
      ,'This is simply a test'
      ,'http://maxpixel.freegreatpicture.com/static/photo/1x/Meat-Power-Recipe-Food-Dishes-Pork-1459693.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 10)
      ]),
    new Recipe(
      2
      ,'A Test Recipe 2'
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

  getRecipeById(id: number) {
    for (let i = 0; i < this.recipes.length; i++) {
      if (this.recipes[i].id == id) {
        return this.recipes[i];
      }
    }
    return null;
  }

  addIngredientsToSL(ingredients: Ingredient[]) {
      this.SLService.addIngredients(ingredients);
  }

  updateRecipe(id, updatedRecipe) {
    for (let i = 0; i < this.recipes.length; i++) {
      if (this.recipes[i].id == id) {
        this.recipes[i].name = updatedRecipe.name;
        this.recipes[i].description = updatedRecipe.description;
        return this.recipes[i];
      }
    }
  }

}
