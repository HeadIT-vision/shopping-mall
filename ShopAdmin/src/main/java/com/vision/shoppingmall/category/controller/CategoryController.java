package com.vision.shoppingmall.category.controller;

import com.vision.shoppingmall.category.model.request.*;
import com.vision.shoppingmall.category.model.response.*;
import com.vision.shoppingmall.category.service.CategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
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
    model.addAttribute("showModal", false);
    return "category/list";
  }

  //GET: /new-category, 카테고리 생성 페이지
  @GetMapping("/new-category")
  public String createCategoryForm(Model model) {
    model.addAttribute("modalTitle", "카테고리 추가하기");
    return "category/category-form";
  }

  //POST: /new-category, 카테고리 생성 요청
  @PostMapping("/new-category")
  public String createCategory(@ModelAttribute @Valid CreateCategoryRequest request, BindingResult bindingResult) {
    if (bindingResult.hasErrors())
      throw new IllegalArgumentException("카테고리명을 입력해주세요.");

    categoryService.create(request);
    return "redirect:/categories";
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
  public String updateCategory(@PathVariable("id") Long categoryId, @Valid UpdateCategoryRequest request, BindingResult bindingResult) {
    if (bindingResult.hasErrors())
      throw new IllegalArgumentException("카테고리명을 입력해주세요.");

    categoryService.update(categoryId, request.getCategoryName());
    return "redirect:/categories";
  }

}
