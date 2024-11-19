import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  showSideMenu: boolean = true;
  widget: boolean = true;
  backgroundClass: string = 'default-background';

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showSideMenu = !event.url.includes('product-info') && !event.url.includes('basket');
        this.widget = !event.url.includes('basket');
        this.updateBackgroundClass(event.url);
      }
    });
  }

  updateBackgroundClass(url: string) {
    if (url.includes('basket')) {
      this.backgroundClass = 'basket-background';
    } else {
      this.backgroundClass = '.default-background'
    }
  }
}
