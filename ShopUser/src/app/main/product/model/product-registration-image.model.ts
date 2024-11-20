export class ProductRegistrationImage {
  public thumbnailImageBase64: string;
  public mainImageBase64: string;

  constructor(
    thumbnailImageBase64: string = '',
    mainImageBase64: string = ''
    )
  {
    this.thumbnailImageBase64 = thumbnailImageBase64;
    this.mainImageBase64 = mainImageBase64;
  }
}
