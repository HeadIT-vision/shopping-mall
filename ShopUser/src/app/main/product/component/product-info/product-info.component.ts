import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductGet } from '../../model/product-get.model';
import { ProductBasketApi } from '../../../basket/api/basket.api';
import { SideMenuService } from '../../../../nav-menu/side-menu/side-menu.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrl: './product-info.component.scss'
})
export class ProductInfoComponent implements OnInit {

  productId: string | null = null;
  decodedImageSrc: string | null = null;
  minusBtnDisabled: boolean = false;
  productCategoryFullPath: string | null = null;
  productDetailData: any;
  categoryFullPath: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productBasketApi: ProductBasketApi,
    private _productservice: ProductService,
    private _sidemenuservice: SideMenuService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(() => {
      this.productId = this.route.snapshot.paramMap.get('productId');
      this.getAllCategories();
    });
  }

  getProductDetailInfo() {
    this._productservice.getProductDetailInfo(this.productId ?? '')
      .then((res: ProductGet) => {
        this.productDetailData = res;
        this.productDetailData.quantity = 1;

        const categoryId = this.productDetailData.categoryId;
        const categoryFullPath = this.categoryFullPath.find((category: any) => category.id === categoryId)

        if (categoryFullPath) {
          this.productCategoryFullPath = categoryFullPath.fullPath.replace(/>/g, ' > ');
        }

        if (this.productDetailData.description) {
          const matchImage = this.productDetailData.description.match(/<img[^>]+src=['"]([^'"]+)['"][^>]*>/);

          if (matchImage && matchImage.length > 1) {
            const base64ImageSrc = matchImage[1];
            this.decodedImageSrc = base64ImageSrc;
          } else {
            this.productDetailData.description = this.productDetailData.description.replace(/<p[^>]*>|<\/p>/g, '');
            this.productDetailData.description = this.productDetailData.description.replace(/&amp;/g, '&');
          }

        } else {
          console.log('description이 없습니다.');
        }

        if (this.productDetailData.quantity === 1) {
          this.minusBtnDisabled = true;
        }

      })
  }

  getAllCategories() {
    this._sidemenuservice.getAllCategory()
      .then((res: any) => {
        this.categoryFullPath = res;
        this.getProductDetailInfo();
      })
  }

  getDiscountPercentage(sellingPrice: number, discountPrice: number): number {
    const discountRate = discountPrice / sellingPrice * 100;
    return Math.round(discountRate);
  }

  goToConsultBasketPage(id: string, quantity: number): void {
    const basket: { id: string; quantity: number; }[] = [{
      id,
      quantity
    }];
    this.productBasketApi.addToBasket(basket);
    this.router.navigate(['basket']);
  }

  // 제품 수량 증가
  increaseQuantity() {
    this.productDetailData.quantity++;
    this.minusBtnDisabled = false;
  }

  // 제품 수량 감소
  decreaseQuantity() {
    if (this.productDetailData.quantity > 1) {
      this.productDetailData.quantity--;
    }
    // 수량이 1일 때 "-" 버튼 비활성화
    if (this.productDetailData.quantity === 1) {
      this.minusBtnDisabled = true;
    }
  }

  checkProductCount(event: any) {
    const inputValue = event.target.value;
    const isKoreanOrEnglish = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣a-zA-Z]/.test(inputValue);

    if (isKoreanOrEnglish) {
      this.productDetailData.quantity = 1;
      event.target.value = this.productDetailData.quantity;
      alert('제품 수량은 숫자만 입력 할 수 있습니다.');
    } else if (inputValue.includes('-') || inputValue === '0') {
      this.productDetailData.quantity = 1;
      event.target.value = this.productDetailData.quantity;
      alert('제품 수량을 -, 0 또는 한글로 입력할 수 없습니다.');
    }
  }

  checkEmpty(event: any) {
    const inputValue = event.target.value;
    if (!inputValue) {
      this.productDetailData.quantity = 1;
      event.target.value = this.productDetailData.quantity;
      alert('값을 입력해주세요.');
    }
  }

}
