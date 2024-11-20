package com.vision.shoppingmall.category.model.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND, reason = "해당 카테고리가 존재하지 않습니다.")
public class CategoryNotFoundException extends RuntimeException {
  public CategoryNotFoundException() {
    super("해당 카테고리가 존재하지 않습니다.");
  }
}