package com.vision.shoppingmall.category.model.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT, reason = "카테고리 이름이 중복되었습니다.")
public class CategoryNameAlreadyExistsException extends RuntimeException {
  public CategoryNameAlreadyExistsException() {
    super("카테고리 이름이 중복되었습니다.");
  }
}