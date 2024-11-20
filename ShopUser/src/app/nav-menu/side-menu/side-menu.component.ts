import { Component, OnInit } from '@angular/core';
import { SideMenuService } from './side-menu.service';
import { VendorDTO } from './model/vendorDTO';
import { CategoryDTO } from './model/categoryDTO';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss'
})
export class SideMenuComponent implements OnInit {

  constructor(private _sideMenuService: SideMenuService) { }

  vendorList: VendorDTO[] = [];
  categoryList: CategoryDTO[] = [];


  ngOnInit(): void {
    this.getCategoryList();
  }

  getCategoryList(): void {
    this._sideMenuService.getCategoryList()
      .then((res: any) => {
        this.categoryList = res;
      });
  }

  toggleChildren(category: CategoryDTO, isChecked: boolean): void {
    if (category.children) {
      category.children.forEach((child) => {
        child.isChecked = isChecked;
        this.toggleChildren(child, isChecked);
      });
    }
  }

  hasDisplayedChildren(category: CategoryDTO): boolean {
    return category.children && category.children.some((child) => child.isDisplayed);
  }

  async toggleCategorySelection(category: CategoryDTO): Promise<void> {
    category.isChecked = !category.isChecked;
    this.toggleChildren(category, category.isChecked);

    await this._sideMenuService.toggleCategorySelection(category);
  }
}
