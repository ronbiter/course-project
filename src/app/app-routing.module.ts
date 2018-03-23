import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { RecipesComponent } from "./recipes/recipes.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { EditRecipeComponent } from "./recipes/edit-recipe/edit-recipe.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { AuthGuard } from "./auth-guard.service";
import { CanDeavtivateGuard } from "./recipes/edit-recipe/can-deactivate-guard.service";
import { ErrorPageComponent } from "./error-page/error-page.component";


const appRoutes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    {
      path: 'recipes',
      component: RecipesComponent,
      //canActivate: [AuthGuard],
      canActivateChild: [AuthGuard],
      children: [
        {path: 'new', component: EditRecipeComponent, canDeactivate: [CanDeavtivateGuard]},          
        {path: ':id', component: RecipeDetailComponent},
        {path: ':id/edit', component: EditRecipeComponent, canDeactivate: [CanDeavtivateGuard]}
      ]
    },
    { path: 'shopping-list', component: ShoppingListComponent },
    //{ path: 'not-found', component: PageNotFoundComponent },
    { path: 'not-found', component: ErrorPageComponent, data: {msg: 'Page not found!'} },
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