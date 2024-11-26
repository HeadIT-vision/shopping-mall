package com.vision.shoppingmall.product.model.entity;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class ProductStatusConverter implements AttributeConverter<ProductStatus, String> {

  @Override
  public String convertToDatabaseColumn(ProductStatus attribute) {
    return attribute == null
        ? null
        : attribute.getValue();
  }

  @Override
  public ProductStatus convertToEntityAttribute(String dbData) {
    return dbData == null
      ? null
      : ProductStatus.fromString(dbData);
  }
}
