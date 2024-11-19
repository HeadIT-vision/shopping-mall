import { ChangeDetectorRef, Component } from '@angular/core';
import '@ckeditor/ckeditor5-build-classic/build/translations/ko';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { ProductBaskets } from '../../model/product-baskets.model';
import { ProductConsulting } from '../../model/product-consulting.model';
import { ProductConsultingRegistrationValidator } from '../../service/product-consulting-registration.validator';
import { ConsultingApi } from '../../api/consulting.api';
import { ProductConsultingRegistrationMapper } from '../../model-util/product-consulting-registration.mapper';
import { ProductConsultingProductsRegistration } from '../../model/product-consulting-products-registration';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from '../../../../utils/alert/alert.component';
import { ProductService } from '../../../product/service/product.service';
import { MatTableDataSource } from '@angular/material/table';
import { QuotationApi } from '../../api/quotation.api';
import { ProductQuotation } from '../../model/product-quotation.model ';

@Component({
  selector: 'app-product-consulting',
  templateUrl: './product-consulting.component.html',
  styleUrl: './product-consulting.component.scss'
})
export class ProductConsultingComponent {
  public Editor: any = Editor;
  savedBaskets: ProductBaskets[] = [];
  dataSource = new MatTableDataSource<ProductBaskets>([]);

  product: ProductConsultingProductsRegistration[] = []
  products: any;
  productConsulting: ProductConsulting = new ProductConsulting('', '', '', '', '', '', true, '', '', []);

  displayedColumns: string[] = [
    'productImage',
    'productName',
    'productQuantity',
    'productPrice',
    'productOrderTotal'
  ];

  constructor(private consultingApi: ConsultingApi,
    private _quotationApi: QuotationApi,
    private router: Router,
    private dialog: MatDialog,
    private productService: ProductService,
    private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit(): void {
    const savedBasketsFromLocalStorage = localStorage.getItem('savedBaskets');
    if (savedBasketsFromLocalStorage) {
      const savedProductIds = JSON.parse(savedBasketsFromLocalStorage) as { id: string, quantity: number }[];
      const productIds = savedProductIds.map(item => item.id);
      this.fetchProductDetails(productIds, savedProductIds);
    } else {
      this.savedBaskets = [];
    }
  }

  fetchProductDetails(productIds: string[], savedProductIds: { id: string, quantity: number }[]): void {
    productIds.forEach(productId => {
      this.productService.getProductDetailInfo(productId).then(
        (productDetail: any) => {
          const quantity = savedProductIds.find(item => item.id === productId)?.quantity || 0;
          this.savedBaskets.push({
            ...productDetail,
            quantity: quantity,
          });
          this.changeDetectorRefs.detectChanges();
          this.dataSource = new MatTableDataSource<any>(this.savedBaskets);
        }
      );
    });
  }

  // 주문 금액 계산
  calculateOrderTotal(quantity: number, price: number): number {
    return quantity * price;
  }

  // 할인 전 주문 금액 계산
  calculateTotalPrice(): number {
    let totalPrice = 0;
    for (const basket of this.savedBaskets) {
      if (basket.currentPrice.sellingPrice !== undefined && basket.currentPrice.sellingPrice !== null) {
        totalPrice += basket.currentPrice.sellingPrice * basket.quantity;
      } else {
        totalPrice += basket.currentPrice.supplyPrice * basket.quantity;
      }
    }
    return totalPrice;
  }

  // 할인 금액
  calculateDiscountAmount(): number {
    let discountAmount = 0;
    for (const basket of this.savedBaskets) {
      if (basket.currentPrice.sellingPrice !== undefined && basket.currentPrice.sellingPrice !== null) {
        discountAmount += (basket.currentPrice.sellingPrice - basket.currentPrice.supplyPrice) * basket.quantity;
      }
    }
    return discountAmount;
  }

  // 견적서 다운로드 요청
  postQuotationRequest(productConsulting: ProductConsulting): void {
    if (productConsulting.businessName === "") {
      return alert("회사명을 입력해주세요.");
    }

    this.products = this.savedBaskets.map(item => ({
      productId: item.id,
      productName: item.productName,
      quantity: item.quantity,
      subDescription: item.subDescription.replace(/<p[^>]*>|<\/p>/g, ''),
      unitPrice: item.currentPrice.supplyPrice,
    }));

    const quotationData = new ProductQuotation(
      productConsulting.businessName,
      [...this.products]
    );


    this._quotationApi.postQuotationRequest(quotationData)
      .then((res) => {
        if (res) this.getDownloadQuotationPDF();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  // 견적서 다운로드
  getDownloadQuotationPDF(): void {
    this._quotationApi.downloadQuotation().subscribe((blob: Blob) => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'output.pdf';
      link.click();
    });
  }

  async onConsultingButtonClicked(): Promise<void> {
    this.productConsulting.phoneNumber = `${this.productConsulting.tel1}${this.productConsulting.tel2}${this.productConsulting.tel3}`;

    this.product = this.savedBaskets.map(item => ({
      productId: item.id,
      quantity: item.quantity
    }));

    const result = new ProductConsultingRegistrationValidator(this.productConsulting).validate(this.productConsulting);
    if (result.length > 0) {
      alert(result[0]);
    } else {
      try {
        if (result.length === 0) {
          const dialogRef = this.dialog.open(AlertComponent, {
            data: {
              title: "상담 등록",
              content: `장바구니에 담겨진 제품들로 상담을 등록하시겠습니까?`,
              registerbutton: "등록하기",
              deletebutton: "취소하기"
            }
          });

          dialogRef.afterClosed().subscribe(async result => {
            if (result) {
              let productConsultingResult = ProductConsultingRegistrationMapper.toProductRegistration([this.productConsulting]);
              productConsultingResult.forEach(async consulting => {
                consulting.products = [...this.product];
                await this.consultingApi.registerConsulting(consulting);
                this.router.navigate(['/product']);
              });
            }
          });
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  }
}

