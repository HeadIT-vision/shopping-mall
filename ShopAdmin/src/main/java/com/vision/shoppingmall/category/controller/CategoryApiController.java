package com.vision.shoppingmall.category.controller;

import com.vision.shoppingmall.category.model.request.*;
import com.vision.shoppingmall.category.model.response.*;
import com.vision.shoppingmall.category.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController()
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryApiController {

  private final CategoryService categoryService;

  @GetMapping()
  public ResponseEntity<List<CategoryListResponse>> getCategoryList() {
    List<CategoryListResponse> result = List.of(new CategoryListResponse());
    return ResponseEntity
        .ok(result);
  }

  @PostMapping()
  public ResponseEntity<CreateCategoryResponse> createCategory(
      @RequestBody CreateCategoryRequest request) {

    CreateCategoryResponse result = categoryService.create(request);
    return ResponseEntity
        .status(HttpStatus.CREATED)
        .body(result);
  }

  @PutMapping()
  public ResponseEntity<UpdateCategoryResponse> updateCategory(UpdateCategoryRequest request) {
    return ResponseEntity.status(HttpStatus.OK)
        .body(new UpdateCategoryResponse());
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
    return ResponseEntity
        .noContent()
        .build();
  }
}
