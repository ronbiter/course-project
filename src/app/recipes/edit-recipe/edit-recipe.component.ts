import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit {

  @Input() recipe: Recipe;

  allowEdit: boolean = false

  constructor(private recipeService: RecipeService
              ,private route: ActivatedRoute) { }

  ngOnInit() {
    this.recipe = this.recipeService.getRecipeById(this.route.snapshot.params['id']);
    this.route.params.subscribe(
      (params) => {
        this.recipe = this.recipeService.getRecipeById(params['id']);
      }
    )
    this.route.queryParams.subscribe(
      (params) => {
        if (params.allowEdit === '1') {
          this.allowEdit = true;
        }
      }
    )
    
  }

  sendToShoppingList() {
    this.recipeService.addIngredientsToSL(this.recipe.ingredients);
  }

  onEdit() {
    // go to edit 
    console.log('edit recipe');
  }

}
