export class CategoryDTO {
  id: string;
  categoryName: string;
  order: number;
  isDisplayed: boolean;
  productCount: number;
  parentId: string | null;
  children: CategoryDTO[];
  isChecked?: boolean;

  constructor (
    id: string = '',
    categoryName: string = '',
    order: number = 0,
    isDisplayed: boolean = false,
    productCount: number = 0,
    parentId: string | null = '',
    childern: CategoryDTO[]

  ) {
    this.id = id;
    this.categoryName = categoryName;
    this.order = order;
    this.isDisplayed = isDisplayed;
    this.productCount = productCount;
    this.parentId = parentId;
    this.children = childern;
  }
}
