import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { CanComponentDeactivate } from './can-deactivate-guard.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit, CanComponentDeactivate {

  @Input() recipe: Recipe;

  allowEdit: boolean = false
  changesSaved: boolean = false;

  recipeName: string;
  recipeDescription: string;

  constructor(private recipeService: RecipeService
              ,private route: ActivatedRoute
              ,private router: Router) { }

  ngOnInit() {
    this.recipe = this.recipeService.getRecipeById(this.route.snapshot.params['id']);
    this.route.params.subscribe(
      (params) => {
        this.recipe = this.recipeService.getRecipeById(params['id']);
        this.recipeName = this.recipe.name.slice();
        this.recipeDescription = this.recipe.description.slice();
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

  onUpdateRecipe() {
    this.recipeService.updateRecipe(this.recipe.id, {name: this.recipeName, description: this.recipeDescription});
    this.changesSaved = true;
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  canDeavtivate(): boolean | Observable<boolean> | Promise<boolean> {
    if (!this.allowEdit) {
      return true;
    }
    if ((this.recipe.name !== this.recipeName || this.recipeDescription !== this.recipe.description) && !this.changesSaved) {
      return confirm('Do you want to discard the changes?');
    } else {
      return true;
    }
  }
  

}
