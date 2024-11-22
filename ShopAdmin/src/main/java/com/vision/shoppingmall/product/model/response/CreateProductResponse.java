package com.vision.shoppingmall.product.model.response;

import com.vision.shoppingmall.product.model.entity.Product;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CreateProductResponse {
  private final String productName;
  private final Long categoryId;
  private final String publisherName;
  private final String authorName;
  private final String translatorName;
  private final int purchasePrice;
  private final int unitPrice;
  private final int discountPrice;
  private final int sellingPrice;
  private final String thumbnailImage;
  private final String productImage;
  
  public static CreateProductResponse from(Product product) {
    return CreateProductResponse.builder()
        .productName(product.getProductName())
        .categoryId(product.getCategory() != null ? product.getCategory().getId() : null)
        .publisherName(product.getPublisherName())
        .authorName(product.getAuthorName())
        .translatorName(product.getTranslatorName())
        .purchasePrice(product.getPurchasePrice())
        .unitPrice(product.getUnitPrice())
        .discountPrice(product.getDiscountPrice())
        .sellingPrice(product.getSellingPrice())
        .thumbnailImage(product.getThumbnail_image_data())
        .productImage(product.getProduct_image_data())
        .build();
  }
}
