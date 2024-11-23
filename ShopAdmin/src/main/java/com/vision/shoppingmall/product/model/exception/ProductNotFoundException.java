package com.vision.shoppingmall.product.model.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND, reason = "해당 상품이 존재하지 않습니다.")
public class ProductNotFoundException extends RuntimeException  {
  public ProductNotFoundException() { super("해당 상품이 존재하지 않습니다."); }
}
