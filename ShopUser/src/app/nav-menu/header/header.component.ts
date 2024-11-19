import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../main/product/service/product.service';
import { ProductBasketApi } from '../../main/basket/api/basket.api';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  searchProductNameInput: string = '';
  basketItemCount: number = 0;

  constructor(
    private router: Router,
    private _productservice: ProductService,
    private _basketapi: ProductBasketApi
  ) { }

  ngOnInit(): void {
    this._basketapi.basketCount$.subscribe(count => {
      this.basketItemCount = count;
    });
  }

  clearSearchInput(): void {
    this.searchProductNameInput = '';
  }

  goToProductBasket() {
    this.router.navigateByUrl('/basket');
    this.clearSearchInput();
  }

  goToProductConsulting() {
    this.router.navigateByUrl('/basket/consulting');
    this.clearSearchInput();
  }

  onSearchProduct() {
    this._productservice.setSearchProductName(this.searchProductNameInput);
  }

  navigateToHeadIT(): void {
    window.open('https://headit.co.kr/', '_blank'); 
  }

  navigateToHeyWorks(): void {
    window.open('https://blog.naver.com/heyworks_app', '_blank'); 
  }
}
