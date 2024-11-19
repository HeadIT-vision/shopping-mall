import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductBaskets } from '../model/product-baskets.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductBasketApi {
  constructor(private http: HttpClient) {
    this.loadBasketsFromLocalStorage();
    this.updateBasketCount();
  }

  items: any[] = [];
  savedBaskets: ProductBaskets[] = [];

  private basketCountSubject = new BehaviorSubject<number>(0);
  basketCount$ = this.basketCountSubject.asObservable();

  addToBasket(basket: { id: string; quantity: number }[]): Promise<void> {
    return new Promise((resolve, reject) => {
      const currentTime = new Date().getTime();
      const expirationTime = currentTime + (24 * 60 * 60 * 1000);

      basket.forEach(basketItem => {
        const existingItemIndex = this.items.findIndex(item => item.productId === basketItem.id);
        
        if (existingItemIndex !== -1) {
          this.items[existingItemIndex].quantity += basketItem.quantity;
          this.items[existingItemIndex].expiration = expirationTime;
        } else {
          if (this.items.length < 10) {
            this.items.push({
              productId: basketItem.id,
              quantity: basketItem.quantity,
              expiration: expirationTime
            });
          } else {
            reject(new Error('장바구니에 더 이상 상품을 추가할 수 없습니다. 최대 개수를 초과하였습니다.'));
            return;
          }
        }
      });

      this.updateLocalStorage();
      resolve();
    });
  }


  loadBasketsFromLocalStorage() {
    const storedSelectedProducts = localStorage.getItem('baskets');
    if (storedSelectedProducts) {
      const parsedItems = JSON.parse(storedSelectedProducts);
      const currentTime = new Date().getTime();

      // 만료된 항목 제거
      this.items = parsedItems.filter((item: any) => item.expiration > currentTime);

      // 만료된 항목이 있을 경우 로컬 스토리지 업데이트
      if (parsedItems.length !== this.items.length) {
        this.updateLocalStorage();
      }
    }
  }

  updateLocalStorage() {
    localStorage.setItem('baskets', JSON.stringify(this.items));
    this.updateBasketCount();
  }

  saveToLocalStorage(selectedProducts: ProductBaskets[]) {
    localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
    this.savedBaskets = selectedProducts;
  }

  updateBasketCount() {
    this.basketCountSubject.next(this.items.length);
  }
}
