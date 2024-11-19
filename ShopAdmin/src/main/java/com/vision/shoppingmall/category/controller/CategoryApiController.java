package com.vision.shoppingmall.category.controller;

import com.vision.shoppingmall.category.model.request.*;
import com.vision.shoppingmall.category.model.response.*;
import com.vision.shoppingmall.category.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;

@Controller
@RequestMapping("/categories")
@RequiredArgsConstructor
//@CrossOrigin(origins = "*")
public class CategoryApiController {

  private final CategoryService categoryService;

  @GetMapping("")
  public String getCategoryList(Model model, @RequestParam(value = "page", defaultValue = "0") int page) {
    Page<CategoryListResponse> paging = categoryService.getCategories(page);
    model.addAttribute("paging", paging);
    return "category/list"; // 템플릿을 렌더링
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
