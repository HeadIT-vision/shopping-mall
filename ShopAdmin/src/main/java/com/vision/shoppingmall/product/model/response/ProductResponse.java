package com.vision.shoppingmall.product.model.response;

import com.vision.shoppingmall.product.model.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ProductResponse {
  private final Long id;
  private final String productName;
  private final Long categoryId;

  private final String publisherName;
  private final String authorName;
  private final String translatorName;

  private final int purchasePrice;
  private final int unitPrice;
  private final int discountPrice;
  private final int sellingPrice;

  private final String thumbnailImageData;
  private final String detailImageData;

  public static ProductResponse from(Product product) {
    return new ProductResponse(
        product.getId(),
        product.getProductName(),
        product.getCategory() != null? product.getCategory().getId() : null,
        product.getPublisherName(),
        product.getAuthorName(),
        product.getTranslatorName(),
        product.getPurchasePrice(),
        product.getUnitPrice(),
        product.getDiscountPrice(),
        product.getSellingPrice(),
        product.getThumbnail_image_data(),
        product.getProduct_image_data()
    );
  }
}
