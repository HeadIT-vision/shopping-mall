import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private searchProductNameSubject = new BehaviorSubject<string>('');
  private selectedProducts: any[] = [];
  private selectedProductsSubject = new BehaviorSubject<any[]>([]);

  private readonly maxHistorySize: number = 10;
  private selectedProductsKey = 'selectedProducts';

  searchProductName$ = this.searchProductNameSubject.asObservable();
  selectedProducts$ = this.selectedProductsSubject.asObservable();

  constructor(private http: HttpClient) { }

  // 제품 목록
  getProductList(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get<{ result: any }>(`${environment.REST_API_ADDR}/products`)
        .subscribe({
          next: (res: { result: any }) => {
            const products = res.result as any;
            const filteredProducts = products.filter((product: any) => product.isDisplayed !== false);
            resolve(filteredProducts);
          },
          error: (error) => reject(error)
        });
    });
  }

  // 제품 찾기
  searchgetProductList(searchTerm: string): Observable<any> {
    return this.http.get<{ result: any }>(`${environment.REST_API_ADDR}/products`).pipe(
      map((res: { result: any }) => {
        const products = res.result as any;
        return products.filter((product: any) =>
          product.isDisplayed !== false && product.productName.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }

  getProducts(pageNum: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get<{ result: any }>(`${environment.REST_API_ADDR}/products/list?pageNum=${pageNum}`)
        .subscribe({
          next: (res: { result: any }) => {
            const products = res.result as any;
            resolve(products);
          },
          error: (error) => {
            reject(error);
          }
        });
    });
  }

  // 상세 제품 정보
  getProductDetailInfo(productId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get<{ result: any }>(`${environment.REST_API_ADDR}/products/${productId}`)
        .subscribe({
          next: (res: { result: any }) => {
            const productDetail = res.result as any;
            resolve(productDetail);
          },
          error: (error) => reject(error)
        });
    });
  }

  // 검색옵션
  getProductSearchOption(productId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get<{ result: any }>(`${environment.REST_API_ADDR}/products/${productId}/search-options`)
        .subscribe({
          next: (res: { result: any }) => {
            const productSearchOption = res.result as any;
            resolve(productSearchOption);
          },
          error: (error) => reject(error)
        });
    });
  }

  // 제품명 검색
  setSearchProductName(productName: string) {
    this.searchProductNameSubject.next(productName);
  }

  // 선택된 제품 추가하기
  addSelectedProduct(product: any): void {
    if (this.selectedProducts.length >= this.maxHistorySize) {
      this.selectedProducts.shift();
    }
    product.description = null;
    this.selectedProducts.push(product);
    this.selectedProductsSubject.next(this.selectedProducts);

    // 로컬 스토리지에 선택된 제품 데이터 저장
    localStorage.setItem(this.selectedProductsKey, JSON.stringify(this.selectedProducts));
  }

  // 선택된 제품 설정값 가져오기
  getSelectedProducts(): Observable<any[]> {
    return this.selectedProductsSubject.asObservable();
  }

  getSelectedProductFromLocalStorage(): void {
    const storedSelectedProducts = localStorage.getItem(this.selectedProductsKey);
    if (storedSelectedProducts) {
      this.selectedProducts = JSON.parse(storedSelectedProducts);
      this.selectedProductsSubject.next(this.selectedProducts);
    }
  }

  clearSelectedProductFromLocalStorage(): void {
    this.selectedProducts = [];
    this.selectedProductsSubject.next(this.selectedProducts);
    localStorage.removeItem(this.selectedProductsKey);
  }
}
