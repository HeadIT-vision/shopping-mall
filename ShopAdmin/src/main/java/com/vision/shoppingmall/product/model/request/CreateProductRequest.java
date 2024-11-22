package com.vision.shoppingmall.product.model.request;

import lombok.Getter;

@Getter
public class CreateProductRequest {
  private String productName;
  private Long categoryId;
  private String publisherName;
  private String authorName;
  private String translatorName;
  private int purchasePrice;
  private int unitPrice;
  private int discountPrice;
  private int sellingPrice;
  private String thumbnailImage;
  private String productImage;
}
