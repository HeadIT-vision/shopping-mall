package com.vision.shoppingmall.category.model.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT, reason = "카테고리에 상품이 존재하여 삭제할 수 없습니다.")
public class CategoryHasProductsException extends RuntimeException {
  public CategoryHasProductsException() {
    super("카테고리에 상품이 존재하여 삭제할 수 없습니다.");
  }
}