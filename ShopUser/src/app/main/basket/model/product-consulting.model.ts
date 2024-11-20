import { ProductBaskets } from "./product-baskets.model";

export class ProductConsulting {
  public name: string;
  public phoneNumber: string;
  public tel1: string;
  public tel2: string;
  public tel3: string;
  public email: string;
  public businessType: boolean;
  public businessName: string;
  public content?: string;
  public products: ProductBaskets[];

  constructor(
    name: string,
    phoneNumber: string,
    tel1: string,
    tel2: string,
    tel3: string,
    email: string,
    businessType: boolean,
    businessName: string,
    content: string,
    products: ProductBaskets[]
  )
  {
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.tel1 = tel1;
    this.tel2 = tel2;
    this.tel3 = tel3;
    this.email = email;
    this.businessType = businessType;
    this.businessName = businessName;
    this.content = content;
    this.products = products;
  }
}