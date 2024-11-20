import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { SignInComponent } from './component/sign-in/sign-in.component';
import {RouterModule, Routes} from "@angular/router";
import {ProductListComponent} from "../product/pages/product-list/product-list.component";
import {ShareModule} from "../../share.module";
import {MatButton} from "@angular/material/button";

const routes: Routes = [
  {
    path: '',
    component: SignInComponent
  },
  {
    path: 'signup',
    component: SignUpComponent
  },
];

@NgModule({
  declarations: [
    SignUpComponent,
    SignInComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    RouterModule.forChild(routes),
    MatButton
  ]
})
export class UserModule { }
