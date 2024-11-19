import { ProductRegistrationImage } from "./product-registration-image.model";
import { ProductRegistrationPrice } from "./product-registration-price.model";

export class SearchOption {
  public searchOptionId: string;
  public searchOptionName: string;

  constructor(searchOptionId: string, searchOptionName: string) {
    this.searchOptionId = searchOptionId;
    this.searchOptionName = searchOptionName;
  }
}

export class ProductGet {
  public id: string;
  public productName: string;
  public vendorId: string;
  public categoryId: string;
  public isDisplayed: boolean;
  public isSaleable: boolean;
  public price: ProductRegistrationPrice;
  public image: ProductRegistrationImage;
  public description: string;
  public subDescription: string;
  public quantity: number;
  public searchOptions: SearchOption[];

  constructor(
    id: string,
    productName: string,
    vendorId: string,
    categoryId: string,
    isDisplayed: boolean,
    isSaleable: boolean,
    price: ProductRegistrationPrice,
    image: ProductRegistrationImage,
    description: string,
    subDescription: string,
    quantity: number,
    searchOptions: SearchOption[]
  ) {
    this.id = id;
    this.productName = productName;
    this.vendorId = vendorId;
    this.categoryId = categoryId;
    this.isDisplayed = isDisplayed;
    this.isSaleable = isSaleable;
    this.price = price;
    this.image = image;
    this.description = description;
    this.subDescription = subDescription;
    this.quantity = quantity;
    this.searchOptions = searchOptions;
  }
}
