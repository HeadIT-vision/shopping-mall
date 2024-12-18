package com.vision.shoppingmall.category.model.response;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class UpdateCategoryResponse {
  private final Long id;
  private final String categoryName;
}
