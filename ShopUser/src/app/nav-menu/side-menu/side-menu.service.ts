import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { CategoryDTO } from './model/categoryDTO';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SideMenuService {

  private allCategories: CategoryDTO[] = [];
  private selectedCategoriesSubject: BehaviorSubject<CategoryDTO[]> = new BehaviorSubject<CategoryDTO[]>([]);
  public onCategoryCheckboxChanged$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  selectedCategories$: Observable<CategoryDTO[]> = this.selectedCategoriesSubject.asObservable();

  constructor(private http: HttpClient) { }

  // 제조사 목록
  getVendorsList(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get<{ result: any }>(`${environment.REST_API_ADDR}/vendors`)
        .subscribe({
          next: (res: { result: any }) => {
            const vendors = res.result as any;
            resolve(vendors);
          },
          error: (error) => reject(error)
        });
    });
  }
  // 카테고리 목록(트리구조)
  getCategoryList(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get<{ result: any }>(`${environment.REST_API_ADDR}/categories/tree`)
        .subscribe({
          next: (res: { result: any }) => {
            const categories = res.result as any;
            this.allCategories = categories;
            resolve(this.allCategories);
          },
          error: (error) => reject(error),
        });
    });
  }

  // 카테고리 목록(전체)
  getAllCategory(): Promise<CategoryDTO> {
    return new Promise((resolve, reject) => {
      this.http.get<{ result: any }>(`${environment.REST_API_ADDR}/categories`)
        .subscribe({
          next: (res: { result: any }) => {
            const categories = res.result as any;
            resolve(categories);
          },
          error: (error) => reject(error),
        });
    });
  }

  async toggleCategorySelection(category: CategoryDTO): Promise<void> {
    const checkedCategoryIds = this.findCheckedCategoryIds(this.allCategories);
    this.onCategoryCheckboxChanged$.next(checkedCategoryIds);
  }

  getAllChildData(category: CategoryDTO): { childCategories: CategoryDTO[], childIds: string[] } {
    let childCategories: CategoryDTO[] = [];
    let childIds: string[] = [];

    if (category.children && category.children.length > 0) {
      category.children.forEach(child => {
        childCategories.push(child);
        childIds.push(child.id);

        const grandchildrenData = this.getAllChildData(child);
        childCategories.push(...grandchildrenData.childCategories);
        childIds.push(...grandchildrenData.childIds);
      });
    }

    return { childCategories, childIds };
  }

  private findCheckedCategoryIds(allCategories: CategoryDTO[]): string[] {
    const checkedCategoryIds: string[] = [];
    const findCheckedIds = (categories: CategoryDTO[]) => {
      categories.forEach((category: CategoryDTO) => {
        if (category.isChecked) {
          checkedCategoryIds.push(category.id);
        }
        if (category.children) {
          findCheckedIds(category.children);
        }
      });
    };
    findCheckedIds(allCategories);
    return checkedCategoryIds;
  }
}
