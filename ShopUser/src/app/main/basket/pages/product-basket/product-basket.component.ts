import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../../product/service/product.service';
import { ProductBaskets } from '../../model/product-baskets.model';
import { ProductBasketApi } from '../../api/basket.api';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from '../../../../utils/alert/alert.component';
import { ProductBasketCompanyComponent } from '../../dialog/product-basket-company/product-basket-company.component';
import { QuotationApi } from '../../api/quotation.api';

@Component({
  selector: 'app-product-basket',
  templateUrl: './product-basket.component.html',
  styleUrl: './product-basket.component.scss'
})

export class ProductBasketComponent implements OnInit {
  selectedRows: Set<string | number> = new Set<string | number>();
  baskets: ProductBaskets[] = [];
  basketProducts: any;
  loading: boolean = true;

  totalPrice: number = 0;
  discountAmount: number = 0;
  totalOrderPrice: number = 0;

  displayedColumns: string[] = [
    'productImage',
    'productName',
    'productPrice',
    'productQuantity',
    'productOrderTotal',
    'productDelete'
  ];

  constructor(private router: Router,
    private productService: ProductService,
    private productBasketApi: ProductBasketApi,
    private _quotationApi: QuotationApi,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.productBasketApi.loadBasketsFromLocalStorage();
    this.loading = true;

    // 1. productBasketApi.addToBasket에 있는 item값 가져오기
    const promises = this.productBasketApi.items.map(item =>
      // 2. ProductService를 사용하여 각 제품의 정보를 가져오기?!
      this.productService.getProductDetailInfo(item.productId)
        .then(result => {
          // 3. 제품의 상세 정보에 quantity 값을 추가하기
          result.quantity = item.quantity;

          // 4. 가져온 제품의 상세 정보를 baskets 배열에 추가하기?!?!
          this.baskets.push(result);

          // 5. 배열을 업데이트!!!!!!!!!
          this.baskets = [...this.baskets];
          this.loading = false;
        })
        .catch(error => {
          console.error(error);
        })
    );

    // 모든 Promise들이 완료될 때까지 기다렸다가 실행하기
    Promise.all(promises)
      .then(() => {
        this.baskets.forEach(row => {
          this.selectedRows.add(row.id);
        });
        this.updateTotalPrice();
        this.loading = false;
      })
      .catch(error => {
        this.loading = false;
      });
  }

  goToConsultingPage() {
    const selectedProductIds: { id: string; quantity: number; }[] = this.baskets
      .filter(item => this.selectedRows.has(item.id))
      .map(item => ({ id: item.id, quantity: item.quantity }));

    if (selectedProductIds.length === 0 && this.baskets.length === 0) {
      // 장바구니에 담긴 제품이 없는 경우
      const dialogRef = this.dialog.open(AlertComponent, {
        data: {
          title: "제품 확인",
          content: `장바구니에 담겨진 제품이 없습니다.<br>상담 요청서로 이동하시겠습니까?`,
          registerbutton: "확인",
          deletebutton: "취소"
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          localStorage.setItem('savedBaskets', JSON.stringify(selectedProductIds));
          this.router.navigate(['basket/consulting']);
        }
      });

    } else if (selectedProductIds.length === 0) {
      // 선택된 제품이 없는 경우
      const dialogRef = this.dialog.open(AlertComponent, {
        data: {
          title: "제품 확인",
          content: `체크박스 선택한 제품이 없습니다.<br>제품을 체크박스 선택 후 상담을 요청해 주시기 바랍니다.`,
          registerbutton: "확인",
          deletebutton: "취소"
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          localStorage.setItem('savedBaskets', JSON.stringify(selectedProductIds));
          this.router.navigate(['basket/consulting']);
        }
      });

    } else {
      // 선택된 제품이 있는 경우
      localStorage.setItem('savedBaskets', JSON.stringify(selectedProductIds));
      this.router.navigate(['basket/consulting']);
    }
  }

  toggleAll() {
    if (this.selectedRows.size === this.baskets.length) {
      this.selectedRows.clear();
    } else {
      this.baskets.forEach(row => {
        this.selectedRows.add(row.id);
      });
    }
    this.updateTotalPrice();
  }

  toggleCheckbox(id: string): void {
    if (this.selectedRows.has(id)) {
      this.selectedRows.delete(id);
    } else {
      this.selectedRows.add(id);
    }
    this.updateTotalPrice();
  }

  areAllSelected(): boolean {
    return this.selectedRows.size === this.baskets.length;
  }

  updateTotalPrice() {
    const selectedProducts = this.baskets.filter(item => this.selectedRows.has(item.id));

    // 총 주문 금액 계산
    this.totalPrice = selectedProducts.reduce((total, basket) => {
      if (basket.currentPrice.sellingPrice !== undefined && basket.currentPrice.sellingPrice !== null) {
        return total + basket.currentPrice.sellingPrice * basket.quantity;
      } else {
        return total + basket.currentPrice.supplyPrice * basket.quantity;
      }
    }, 0);

    // 할인 금액 계산
    this.discountAmount = selectedProducts.reduce((total, basket) => {
      if (basket.currentPrice.sellingPrice !== undefined && basket.currentPrice.sellingPrice !== null) {
        return total + (basket.currentPrice.sellingPrice - basket.currentPrice.supplyPrice) * basket.quantity;
      } else {
        return total;
      }
    }, 0);

    this.totalOrderPrice = this.totalPrice - this.discountAmount;
  }

  // 제품 수량 늘리기
  increaseQuantity(product: ProductBaskets) {
    product.quantity++;
    this.updateProductBasketApi();
    this.updateTotalPrice();
    this.productBasketApi.updateLocalStorage();
  }

  // 제품 수량 줄이기
  decreaseQuantity(product: ProductBaskets) {
    if (product.quantity > 1) {
      product.quantity--;
    }
    this.updateProductBasketApi();
    this.updateTotalPrice();
    this.productBasketApi.updateLocalStorage();
  }

  updateProductBasketApi() {
    this.productBasketApi.items = this.baskets.map(item => ({ productId: item.id, quantity: item.quantity }));
  }

  // 주문 금액 계산
  calculateOrderTotal(quantity: number, price: number): number {
    return quantity * price;
  }

  // 선택 삭제하기
  deleteSelectedRows() {
    for (const selectedId of this.selectedRows) {
      const index = this.baskets.findIndex(item => item.id === selectedId);
      if (index !== -1) {
        this.baskets.splice(index, 1);

        // 선택된 행을 productBasketApi.items에서도 삭제하기
        const itemIndex = this.productBasketApi.items.findIndex(item => item.productId === selectedId);
        if (itemIndex !== -1) {
          this.productBasketApi.items.splice(itemIndex, 1);
        }
      }
    }

    this.baskets = [...this.baskets];
    this.updateTotalPrice();
    this.productBasketApi.updateLocalStorage();
  }

  // 개별 삭제하기
  deleteRow(id: string) {
    const index = this.baskets.findIndex(item => item.id === id);
    if (index !== -1) {
      this.baskets.splice(index, 1);
    }
    const itemIndex = this.productBasketApi.items.findIndex(item => item.productId === id);
    if (itemIndex !== -1) {
      this.productBasketApi.items.splice(itemIndex, 1);
    }
    this.baskets = [...this.baskets];
    this.updateTotalPrice();
    this.productBasketApi.updateLocalStorage();
  }

  openInputCompanyDialog(): void {
    if (this.baskets.length > 0) {
      const dialogRef = this.dialog.open(ProductBasketCompanyComponent);

      dialogRef.afterClosed().subscribe(result => {
        if (result && result.businessName) {
          this.postQuotationRequest(result.businessName);
        }
      })
    } else {
      alert("장바구니에 제품이 없습니다.\n제품을 담아주세요")
    }
  }

  postQuotationRequest(businessName: string): void {
    if (businessName === "") {
      return alert("회사명을 입력해주세요");
    }

    const quotationData = {
      reception: businessName,
      products: this.baskets.map(item => ({
        productId: item.id,
        productName: item.productName,
        quantity: item.quantity,
        subDescription: item.subDescription.replace(/<p[^>]*>|<\/p>/g, ''),
        unitPrice: item.currentPrice.supplyPrice,
      }))
    };

    this._quotationApi.postQuotationRequest(quotationData)
      .then((res) => {
        if (res) {
          this.getDownloadQuotationPDF();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  getDownloadQuotationPDF(): void {
    this._quotationApi.downloadQuotation()
      .subscribe((blob: Blob) => {
        const fileName = 'HeadIT_' + this.getFormattedDate() + '.pdf';
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
      });
  }

  getFormattedDate(): string {
    const date = new Date();
    const year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    
    return year + month + day;
  }

  openDeleteBasketProducts(): void {
    if (this.selectedRows) {
      const dialogRef = this.dialog.open(AlertComponent, {
        data: {
          title: "상품 삭제",
          content: `해당 장바구니에 지정된 상품을 삭제 하시겠습니까?`,
          registerbutton: "삭제하기",
          deletebutton: "취소하기"
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.deleteSelectedRows();
        }
      })
    }
  }

  openDeleteBasketProduct(id: string): void {
    if (this.selectedRows) {
      const dialogRef = this.dialog.open(AlertComponent, {
        data: {
          title: "상품 삭제",
          content: `해당 장바구니에 지정된 상품을 삭제 하시겠습니까?`,
          registerbutton: "삭제하기",
          deletebutton: "취소하기"
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.deleteRow(id);
        }
      })
    }
  }

}
