package com.vision.shoppingmall.category.model.response;

import com.vision.shoppingmall.category.model.entity.Category;
import lombok.Getter;

import java.math.BigInteger;

@Getter
public class CreateCategoryResponse {
  private Long id;
  private String categoryName;

  public CreateCategoryResponse(Category category) {
    this.id = category.getId();
    this.categoryName = category.getCategoryName();
  }
}
