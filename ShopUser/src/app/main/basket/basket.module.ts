import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ShareModule } from '../../share.module';
import { ProductBasketComponent } from './pages/product-basket/product-basket.component';
import { ProductConsultingComponent } from './pages/product-consulting/product-consulting.component';
import { ProductBasketCompanyComponent } from './dialog/product-basket-company/product-basket-company.component';

const routes: Routes = [
  {
    path: '',
    component: ProductBasketComponent
  },
  {
    path: 'consulting',
    component: ProductConsultingComponent
  }
];

@NgModule({
  declarations: [
    ProductBasketComponent,
    ProductConsultingComponent,
    ProductBasketCompanyComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    RouterModule.forChild(routes)
  ]
})
export class BasketModule { }
