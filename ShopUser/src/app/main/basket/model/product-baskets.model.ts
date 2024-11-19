import { ProductRegistrationImage } from "../../product/model/product-registration-image.model";
import { ProductRegistrationPrice } from "../../product/model/product-registration-price.model";


export class ProductBaskets {
  public id: string;
  public productName: string;
  public vendorName: string;
  public vendorId: string;
  public categoryId: string;
  public isDisplayed: boolean;
  public isSaleable: boolean;
  public currentPrice: ProductRegistrationPrice;
  public image: ProductRegistrationImage;
  public description: string;
  public subDescription: string;
  public quantity: number;

  constructor(
    id: string,
    productName: string,
    vendorName: string,
    vendorId: string,
    categoryId: string,
    isDisplayed: boolean,
    isSaleable: boolean,
    currentPrice: ProductRegistrationPrice,
    image: ProductRegistrationImage,
    description: string,
    subDescription: string,
    quantity: number
    )
  {
    this.id = id;
    this.productName = productName;
    this.vendorName = vendorName;
    this.vendorId = vendorId;
    this.categoryId = categoryId;
    this.isDisplayed = isDisplayed;
    this.isSaleable = isSaleable;
    this.image = image;
    this.currentPrice = currentPrice;
    this.description = description;
    this.subDescription = subDescription;
    this.quantity = quantity;
  }
}
