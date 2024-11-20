export class ProductRegistrationPrice {
  public purchasePrice: number;
  public sellingPrice: number;
  public discountRate: number;
  public supplyPrice: number;
  public includeVat: boolean;

  constructor(
    purchasePrice: number = 0,
    sellingPrice: number = 0,
    discountRate: number = 0,
    supplyPrice: number = 0,
    includeVat: boolean = false
    )
  {
    this.purchasePrice = purchasePrice;
    this.sellingPrice = sellingPrice;
    this.discountRate = discountRate;
    this.supplyPrice = supplyPrice;
    this.includeVat = includeVat;
  }
}
