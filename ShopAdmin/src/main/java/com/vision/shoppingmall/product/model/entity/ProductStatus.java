package com.vision.shoppingmall.product.model.entity;

import lombok.Getter;

@Getter
public enum ProductStatus {
  ACTIVE("Y"),
  INACTIVE("N");

  private final String value;

  ProductStatus(String value) {
    this.value = value;
  }

  public static ProductStatus fromString(String value) {
    for (ProductStatus status : ProductStatus.values()) {
      if (status.getValue().equalsIgnoreCase(value)) return status;
    }
    throw new IllegalArgumentException("Unknown ProductStatus value: " + value);
  }
}
