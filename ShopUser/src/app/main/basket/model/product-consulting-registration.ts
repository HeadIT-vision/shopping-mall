import { ProductConsultingProductsRegistration } from "./product-consulting-products-registration";

export class ProductConsultingRegistration {
  public title: string;
  public name: string;
  public phoneNumber: string;
  public email: string;
  public businessType: number;
  public businessName: string;
  public content?: string;
  public products: ProductConsultingProductsRegistration[];

  constructor(
    title: string,
    name: string,
    phoneNumber: string,
    email: string,
    businessType: number,
    businessName: string,
    content: string,
    products: ProductConsultingProductsRegistration[]
  )
  {
    this.title = title;
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.businessType = businessType;
    this.businessName = businessName;
    this.content = content;
    this.products = products;
  }
}