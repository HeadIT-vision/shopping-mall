import { ProductBaskets } from "./product-baskets.model";

export class ProductQuotation {
  public reception: string;
  public products: ProductBaskets[];

  constructor(
    reception: string,
    products: ProductBaskets[]
  ) {

    this.reception = reception;
    this.products = products;
  }
}