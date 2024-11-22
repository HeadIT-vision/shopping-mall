package com.vision.shoppingmall.product.model.response;

import com.vision.shoppingmall.product.model.entity.Product;
import lombok.*;

import java.math.BigInteger;

@Getter
@AllArgsConstructor
public class ProductListResponse {
    private final Long id;
    private final String productName;

    private final String publisherName;
    private final String authorName;
    private final String translatorName;

    private final int purchasePrice;
    private final int unitPrice;
    private final int discountPrice;
    private final int sellingPrice;

    public static ProductListResponse from(Product product) {
        return new ProductListResponse(
            product.getId(),
            product.getProductName(),
            product.getPublisherName(),
            product.getAuthorName(),
            product.getTranslatorName(),
            product.getPurchasePrice(),
            product.getUnitPrice(),
            product.getDiscountPrice(),
            product.getSellingPrice()
        );
    }
}
