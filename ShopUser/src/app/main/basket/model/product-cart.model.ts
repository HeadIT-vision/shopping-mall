export class ProductCart {
  public productId: string;
  public quantity: number;

  constructor(
    productId: string,
    quantity: number
    )
  {
    this.productId = productId;
    this.quantity = quantity;
  }
}
