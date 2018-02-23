import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { RecipesComponent } from "./recipes/recipes.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { EditRecipeComponent } from "./recipes/edit-recipe/edit-recipe.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";


const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    {
      path: 'recipes',
      component: RecipesComponent,
      children: [
        {path: ':id', component: RecipeDetailComponent},
        {path: ':id/edit', component: EditRecipeComponent}
      ]
    },
    { path: 'shopping-list', component: ShoppingListComponent },
    { path: 'not-found', component: PageNotFoundComponent },
    { path: '**', redirectTo: 'not-found' }
  ]
  

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {

}