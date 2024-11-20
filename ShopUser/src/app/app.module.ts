import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './nav-menu/header/header.component';
import { SideMenuComponent } from './nav-menu/side-menu/side-menu.component';
import { WidgetComponent } from './nav-menu/widget/widget.component';
import { LayoutComponent } from './nav-menu/layout/layout.component';
import { ProductListComponent } from './main/product/pages/product-list/product-list.component';
import { ShareModule } from './share.module';
import { FooterComponent } from './nav-menu/footer/footer.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AlertComponent } from './utils/alert/alert.component';
import { AlertSingleComponent } from './utils/alert-single/alert-single.component';
import { SnackbarComponent } from './utils/snackbar/snackbar.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideMenuComponent,
    WidgetComponent,
    LayoutComponent,
    ProductListComponent,
    FooterComponent,
    AlertComponent,
    AlertSingleComponent,
    SnackbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ShareModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
