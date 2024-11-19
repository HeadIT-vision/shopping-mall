package com.vision.shoppingmall.product.model.response;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.math.BigInteger;

@Getter
@Setter
@RequiredArgsConstructor
public class ProductListResponse {
    private final Long id;
    private final String productName;

    private final String publisherName;
    private final String authorName;

    private final Double purchasePrice;
    private final Double unitPrice;
    private final Double discountPrice;
    private final Double sellingPrice;
}
