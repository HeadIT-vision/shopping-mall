package com.vision.shoppingmall.category.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/categories")
public class CategoryApiController {

  @DeleteMapping("/{id}")
  public void deleteCategory(@PathVariable("id") Long id) {
    // 카테고리 삭제 로직
  }
}
