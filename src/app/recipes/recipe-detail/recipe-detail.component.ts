import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Recipe } from '../recipe.model';

import { RecipeService } from '../recipe.service';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;

  constructor(private recipeService: RecipeService
              ,private route: ActivatedRoute
              ,private router: Router) { }

  ngOnInit() {
    //this.recipe = this.recipeService.getRecipeById(this.route.snapshot.params['id']);
    this.route.params.subscribe(
      (params) => {
        this.recipe = this.recipeService.getRecipeById(params['id']);
      }
    )
    
  }

  sendToShoppingList() {
    this.recipeService.addIngredientsToSL(this.recipe.ingredients);
  }

  onEdit() {
    this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'preserve'});
    console.log('edit recipe');
  }

}
