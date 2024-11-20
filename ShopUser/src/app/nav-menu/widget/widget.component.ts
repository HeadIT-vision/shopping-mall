import { Component, HostListener } from '@angular/core';
import { ProductService } from '../../main/product/service/product.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent {

  productHistory: any[] = [];
  showAllProducts: boolean = false;
  showTopButton: boolean = false;
  availableHeight!: number;
  maxCnt: number = 0;

  constructor(
    private productService: ProductService,
    private router: Router
  ) { }
  isSidebarOpen: boolean = true;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.availableHeight = (window.innerHeight - 268) > 0 ? window.innerHeight - 268 : 0;
    this.getMaxHeight();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showTopButton = window.scrollY > window.innerHeight / 2;
  }

  ngOnInit(): void {
    this.productService.getSelectedProductFromLocalStorage();
    this.productService.getSelectedProducts().subscribe(products => {
      this.productHistory = products;
      this.getMaxHeight();
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isSidebarOpen = true;
      }
    });

    this.availableHeight = (window.innerHeight - 268) > 0 ? window.innerHeight - 268 : 0;
    this.getMaxHeight();
  }

  goToProductDetailPage(productId: string): void {
    this.router.navigate(['product/product-info', { productId: productId }]);
  }

  showMoreHistory(): void {
    this.showAllProducts = !this.showAllProducts;
    this.getMaxHeight();
  }


  onCloseSidebar() {
    this.isSidebarOpen = false;
    this.productService.clearSelectedProductFromLocalStorage();
  }

  getMaxHeight() {
    if (this.productHistory.length > 0) {
      this.maxCnt = Math.floor(this.availableHeight / 85);
    }

    if (!this.showAllProducts) this.maxCnt = this.maxCnt > 5 ? 5 : 0;
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0
    });
  }
}
