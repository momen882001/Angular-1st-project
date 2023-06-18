import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  {
    path: 'recipe',
    loadChildren: () =>
      import('./modules/recipes/recipes.module').then(
        (recipe) => recipe.RecipesModule
      ),
  },
  {
    path: 'shoppinglist',
    loadChildren: () =>
      import('./modules/shopping-list/shopping-list.module').then(
        (shopList) => shopList.ShoppingListModule
      ),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((auth) => auth.AuthModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class RoutingModuleApp {}
