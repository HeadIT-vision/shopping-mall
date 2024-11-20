import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { SideMenuService } from '../../../../nav-menu/side-menu/side-menu.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ProductBasketComponent } from '../../dialog/product-basket/product-basket.component';
import { ProductGet } from '../../model/product-get.model';
import { SearchOptionService } from '../../service/search-option.service';
import { SearchOptionGroup } from '../../model/search-option.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {

  private searchProductNameInputSubscription: Subscription = new Subscription;

  constructor(
    private readonly _productService: ProductService,
    private _sideMenuService: SideMenuService,
    private _searchOptionService: SearchOptionService,
    private dialog: MatDialog
  ) { }

  productList: any;
  allProductLength: number = 0;
  filteredProductList: any;
  loading: boolean = true;

  selectedCategoryIds: string[] = [];
  selectedSearchOptionIds: string[] = [];

  searchOption: SearchOptionGroup[] = [];
  selectedSearchOptions: { [groupId: string]: string[] } = {};

  searchProductName: string = '';
  showProducts: boolean = false;
  displayedProductCount: number = 10;


  ngOnInit(): void {
    this.getAllProductLength();
    this.getProducts();

    this._sideMenuService.onCategoryCheckboxChanged$.subscribe((categoryIds: string[]) => {
      this.selectedCategoryIds = categoryIds;
      this.selectedSearchOptionIds = [];
      this.filterProductList();
      if (categoryIds.length > 0)
        this.getCategoryOptionBy();
    });

    this.onSearchProductName();
  }

  ngOnDestroy(): void {
    this.searchProductNameInputSubscription.unsubscribe();
  }

  getCategoryOptionBy(): void {
    this._searchOptionService.getSearchOptionByCategoryIds(this.selectedCategoryIds)
      .then((res: any) => {
        this.searchOption = res;
      })
      .catch(error => {
        console.error('Error fetching search options:', error);
      });
  }

  getAllProductLength(): void {
    this._productService.getProductList()
      .then((res: any) => {
        let list = JSON.parse(JSON.stringify(res));
        this.allProductLength = list.length;
      });
  }

  getProducts(): void {
    this._productService.getProductList()
      .then((res: ProductGet[]) => {
        if (!Array.isArray(res)) {
          this.productList = [];
        } else {
          this.productList = res;
        }

        this.productList.forEach((product: ProductGet) => {
          if (product.productName) {
            product.productName = product.productName.replace(/'/g, "");
          }
        });

        this.filterProductList();
        this.loading = false;
      })
      .catch(error => {
        console.error('제품 목록을 불러올 수 없습니다.:', error);
        this.loading = false;
      });
  }


  // 각 항목의 ID를 기준으로 비교
  trackByProductId(item: any): number {
    return item.id;
  }

  getSearchOption(): void {
    this._searchOptionService.getSearchOption()
      .then((res: any) => {
        this.searchOption = res;
      })
  }

  filterProductList(): void {
    if (!this.productList) {
      this.filteredProductList = [];
      return;
    }

    let filteredProductList = this.productList;

    if (this.selectedCategoryIds.length > 0) {
      filteredProductList = this.filteredByCategoryId(filteredProductList, this.selectedCategoryIds);
    }

    if (this.searchProductName.trim().length > 0) {
      filteredProductList = this.filteredByProductName(filteredProductList, this.searchProductName);
    }

    filteredProductList = filteredProductList.filter((product: { searchOptions: any[]; }) => {
      return Object.keys(this.selectedSearchOptions).every(groupId => {
        const selectedOptions = this.selectedSearchOptions[groupId];
        if (selectedOptions.length === 0) {
          return true;
        }
        return selectedOptions.some(optionId =>
          product.searchOptions.some(option => option.searchOptionId === optionId)
        );
      });
    });

    this.filteredProductList = filteredProductList;
  }

  onSearchOptionChange(event: any, searchOptionId: string, groupId: string): void {
    if (!this.selectedSearchOptions[groupId]) {
      this.selectedSearchOptions[groupId] = [];
    }

    if (event.checked) {
      this.selectedSearchOptions[groupId].push(searchOptionId);
    } else {
      const index = this.selectedSearchOptions[groupId].indexOf(searchOptionId);
      if (index > -1) {
        this.selectedSearchOptions[groupId].splice(index, 1);
      }
    }
    this.filterProductList();
  }

  filteredByProductName(products: ProductGet[], searchProductName: string): ProductGet[] {
    if (!products) {
      return [];
    }
    const lowerCaseSearchProductName = searchProductName.toLowerCase();
    return products.filter((product: ProductGet) =>
      product.productName.toLowerCase().includes(lowerCaseSearchProductName)
    );
  }

  filteredByCategoryId(products: ProductGet[], categoryIds: string[]): ProductGet[] {
    return products.filter((product: ProductGet) => (categoryIds.includes(product.categoryId)));
  }

  filteredBySearchOptionId(products: ProductGet[], searchOptionIds: string[]): ProductGet[] {
    return products.filter((product: ProductGet) =>
      product.searchOptions.some(option => searchOptionIds.includes(option.searchOptionId))
    );
  }

  filteredSearchOptions() {
    return this.searchOption.filter(group =>
      group.searchOptions.some(option => option.isEnable)
    );
  }

  shouldDisplayCard(): boolean {
    return this.selectedCategoryIds.length > 0 &&
      this.searchOption.length > 0 &&
      this.filteredSearchOptions().length > 0;
  }

  // 할인율 | (할인금액) / (정가) * 100
  getDiscountPercentage(sellingPrice: number, discountPrice: number): number {
    const discountRate = discountPrice / sellingPrice * 100;
    return Math.round(discountRate);
  }

  onSearchProductName(): void {
    this.searchProductNameInputSubscription = this._productService.searchProductName$
      .subscribe(productName => {
        this.searchProductName = productName;
        this.filterProductList();
      })
  }

  showMoreProducts(): void {
    if (this.displayedProductCount + 10 <= this.filteredProductList.length) {
      this.displayedProductCount += 10;
    } else {
      if (!this.showProducts) {
        this.showProducts = true;
      }
    }
  }

  get productListChunks() {
    const chunkSize = 1;

    let productsToDisplay = this.showProducts ? this.filteredProductList : this.filteredProductList.slice(0, this.displayedProductCount);
    const arrayChunks = [];

    for (let i = 0; i < productsToDisplay.length; i += chunkSize) {
      arrayChunks.push(productsToDisplay.slice(i, i + chunkSize));
    }

    return arrayChunks;
  }


  openBasketDialog(product: ProductGet): void {
    if (!product.isSaleable) {
      alert("판매가 중지된 제품으로 장바구니에 담을 수 없습니다.");
    } else {
      this.dialog.open(ProductBasketComponent, {
        data: { selectedProduct: product }
      });
    }
  }

}
