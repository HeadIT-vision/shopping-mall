package com.vision.shoppingmall.category.controller;

import com.vision.shoppingmall.category.model.entity.Category;
import com.vision.shoppingmall.category.model.exception.CategoryNameAlreadyExistsException;
import com.vision.shoppingmall.category.model.exception.CategoryNotFoundException;
import com.vision.shoppingmall.category.model.request.*;
import com.vision.shoppingmall.category.model.response.*;
import com.vision.shoppingmall.category.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Optional;

@Controller
@RequestMapping("/categories")
@RequiredArgsConstructor
public class CategoryController {

  private final CategoryService categoryService;

  //GET: /categories, 카테고리 목록 조회 페이지
  @GetMapping("")
  public String getCategoryList(Model model, @RequestParam(value = "page", defaultValue = "0") int page) {
    Page<CategoryListResponse> paging = categoryService.getCategories(page);
    model.addAttribute("paging", paging);
    return "category/list"; // 템플릿을 렌더링
  }

  //GET: /new-category, 카테고리 생성 페이지
  @GetMapping("/new-category")
  public String createCategoryForm(Model model) {
    model.addAttribute("modalTitle", "카테고리 추가하기");
    return "category/category-form";
  }

  //POST: /new-category, 카테고리 생성 요청
  @PostMapping("/new-category")
  public ResponseEntity createCategory(@ModelAttribute CreateCategoryRequest request) {
    try {
      categoryService.create(request);
      return ResponseEntity.status(HttpStatus.OK)
          .header(HttpHeaders.LOCATION, "/categories")
          .build();
    } catch (CategoryNameAlreadyExistsException e) {
      return ResponseEntity.status(HttpStatus.CONFLICT)
          .body(Collections.singletonMap("message", e.getMessage()));
    }
  }

  @GetMapping("/update-category/{id}")
  public String updateCategory(@PathVariable("id") Long categoryId, Model model) {
    Optional<CategoryListResponse> category = categoryService.getCategoryById(categoryId);
    if (category.isEmpty())
      return "redirect:/categories";
    model.addAttribute("modalTitle", "카테고리 수정하기");
    model.addAttribute("category", category.get());
    return "category/category-form";
  }

  @PostMapping("update-category/{id}")
  public ResponseEntity updateCategory(@PathVariable("id") Long categoryId, UpdateCategoryRequest request) {
    try {
      categoryService.update(categoryId, request.getCategoryName());
      return ResponseEntity.status(HttpStatus.OK)
          .header(HttpHeaders.LOCATION, "/categories")
          .build();
    } catch (CategoryNameAlreadyExistsException e) {
      return ResponseEntity.status(HttpStatus.CONFLICT)
          .body(Collections.singletonMap("message", e.getMessage()));
    } catch (CategoryNotFoundException e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND)
          .body(Collections.singletonMap("message", e.getMessage()));
    }
  }

}
