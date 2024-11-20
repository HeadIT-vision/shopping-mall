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

@Controller
@RequestMapping("/categories")
@RequiredArgsConstructor
//@CrossOrigin(origins = "*")
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
  @GetMapping("new-category")
  public String createCategoryForm(Model model) {
    return null;
  }

  //POST: /categories, 카테고리 생성 요청
  @PostMapping("new-category")
  public String createCategory(@RequestBody CreateCategoryRequest request) {
    return null;
  }

  @GetMapping("update-category")
  public String updateCategoryForm() {
    return null;
  }
  @PostMapping("update-category")
  public String updateCategory(UpdateCategoryRequest request) {
    return null;
  }
}
