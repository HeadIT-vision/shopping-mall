package com.vision.shoppingmall.product.model.request;

import lombok.Getter;

@Getter
public class CreateProductRequest {

  private String productName;

  private Long categoryId;
  private String publisherName;
  private String authorName;
  private String translatorName;
  private Double purchasePrice;
  private Double unitPrice;
  private Double discountPrice;
  private Double sellingPrice;
  private String thumbnailImage;
  private String detailImage;
}
