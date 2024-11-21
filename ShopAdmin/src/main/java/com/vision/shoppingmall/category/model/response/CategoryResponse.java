package com.vision.shoppingmall.category.model.response;

import com.vision.shoppingmall.category.model.entity.Category;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.math.BigInteger;

@Getter
@Setter
@RequiredArgsConstructor
public class CategoryResponse {
  private final Long id;
  private final String categoryName;
}
