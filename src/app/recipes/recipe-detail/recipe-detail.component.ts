import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Recipe } from '../recipe.model';

import { RecipeService } from '../recipe.service';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  @Input() recipe: Recipe;

  constructor(private recipeService: RecipeService
              ,private route: ActivatedRoute) { }

  ngOnInit() {
    this.recipe = this.recipeService.getRecipeById(this.route.snapshot.params['id']);
    this.route.params.subscribe(
      (params) => {
        this.recipe = this.recipeService.getRecipeById(params['id']);
      }
    )
    
  }

  sendToShoppingList() {
    this.recipeService.addIngredientsToSL(this.recipe.ingredients);
  }



}
