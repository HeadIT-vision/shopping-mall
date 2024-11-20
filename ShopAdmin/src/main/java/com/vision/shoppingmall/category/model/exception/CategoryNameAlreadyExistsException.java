package com.vision.shoppingmall.category.model.exception;

public class CategoryNameAlreadyExistsException extends RuntimeException {
  public CategoryNameAlreadyExistsException() {
    super("카테고리 이름이 중복되었습니다.");
  }
}