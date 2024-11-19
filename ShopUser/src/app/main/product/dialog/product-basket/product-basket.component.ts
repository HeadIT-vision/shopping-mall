import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductBasketApi } from '../../../basket/api/basket.api';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../../../../utils/snackbar/snackbar.component';

@Component({
  selector: 'app-product-basket',
  templateUrl: './product-basket.component.html',
  styleUrl: './product-basket.component.scss'
})
export class ProductBasketComponent {

  minusBtnDisabled: boolean = false;
  quantity: number = 1;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _productBasketApi: ProductBasketApi,
    private snackbar: MatSnackBar,
  ) {
    data.selectedProduct.quantity = 1;
    
    if (data.selectedProduct.quantity === 1) {
      this.minusBtnDisabled = true;
    }
  }

  // 제품 수량 증가
  increaseQuantity() {
    this.data.selectedProduct.quantity++;
    this.minusBtnDisabled = false;
  }

  // 제품 수량 감소
  decreaseQuantity() {
    if (this.data.selectedProduct.quantity > 1) {
      this.data.selectedProduct.quantity--;
    }
    // 수량이 1일 때 "-" 버튼 비활성화
    if (this.data.selectedProduct.quantity === 1) {
      this.minusBtnDisabled = true;
    }
  }
  checkProductCount(event: any) {
    const inputValue = event.target.value;
    const isKoreanOrEnglish = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣a-zA-Z]/.test(inputValue);

    if (isKoreanOrEnglish) {
      this.data.selectedProduct.quantity = 1;
      event.target.value = this.data.selectedProduct.quantity;
      alert('제품 수량은 숫자만 입력 할 수 있습니다.');
    } else if (inputValue.includes('-') || inputValue === '0') {
      this.data.selectedProduct.quantity = 1;
      event.target.value = this.data.selectedProduct.quantity;
      alert('제품 수량을 -, 0 또는 한글로 입력할 수 없습니다.');
    } else {
      this.quantity = parseInt(inputValue);
    }
  }

  checkEmpty(event: any) {
    const inputValue = event.target.value;
    if (!inputValue) {
      this.data.selectedProduct.quantity = 1;
      event.target.value = this.data.selectedProduct.quantity;
      alert('값을 입력해주세요.');
    }
  }

  // 장바구니 담기
  onAddToBasket(id: string, quantity: number): void {
    const basket: { id: string, quantity: number; }[] =[{
      id,
      quantity
    }];
    
    this._productBasketApi.addToBasket(basket)
      .then(() => {
        this.onAddedToBasketAlert();
      })
      .catch((error) => alert(error.message));
    
  }

  onAddedToBasketAlert(): void {
    this.snackbar.openFromComponent(SnackbarComponent, {
      duration: 1000,
      data: { message: "해당 상품을 장바구니에 담았습니다." }
    });
  }
}
