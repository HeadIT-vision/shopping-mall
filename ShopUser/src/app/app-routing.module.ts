import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LayoutComponent} from "./nav-menu/layout/layout.component";
const routes: Routes = [
  {
    path: '',
    redirectTo: 'product',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./main/user/user.module').then((m) => m.UserModule)
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'product',
        loadChildren: () =>
          import('./main/product/product.module').then(
            (m) => m.ProductModule
          )
      },
      {
        path: 'basket',
        loadChildren: () =>
          import('./main/basket/basket.module').then(
            (m) => m.BasketModule
          )
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
