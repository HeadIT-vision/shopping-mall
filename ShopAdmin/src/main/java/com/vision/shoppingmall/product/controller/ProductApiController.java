package com.vision.shoppingmall.product.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/products")
public class ProductApiController {

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteProduct() {
    return null;
  }
}
