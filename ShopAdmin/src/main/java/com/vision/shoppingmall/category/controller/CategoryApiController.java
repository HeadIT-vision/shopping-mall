package com.vision.shoppingmall.category.controller;

import com.vision.shoppingmall.category.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryApiController {

  private final CategoryService categoryService;
  @DeleteMapping("/{id}")
  public void deleteCategory(@PathVariable("id") Long id) {
    categoryService.delete(id);
  }
}
