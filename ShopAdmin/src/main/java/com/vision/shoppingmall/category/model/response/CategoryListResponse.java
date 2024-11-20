package com.vision.shoppingmall.category.model.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.math.BigInteger;

@Getter
@Setter
@RequiredArgsConstructor
public class CategoryListResponse {
  private final Long id;
  private final String categoryName;
}
