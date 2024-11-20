import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ShareModule } from '../../share.module';
import { ProductInfoComponent } from './component/product-info/product-info.component';
import { ProductBasketComponent } from './dialog/product-basket/product-basket.component';

const routes: Routes = [
  {
    path: '',
    component: ProductListComponent
  }
];

@NgModule({
  declarations: [
    ProductInfoComponent,
    ProductBasketComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    RouterModule.forChild(routes)
  ]
})
export class ProductModule { }
