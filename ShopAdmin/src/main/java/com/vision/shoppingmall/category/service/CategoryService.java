package com.vision.shoppingmall.category.service;

import com.vision.shoppingmall.category.model.entity.Category;
import com.vision.shoppingmall.category.model.exception.CategoryNameAlreadyExistsException;
import com.vision.shoppingmall.category.model.exception.CategoryNotFoundException;
import com.vision.shoppingmall.category.model.request.CreateCategoryRequest;
import com.vision.shoppingmall.category.model.response.CategoryListResponse;
import com.vision.shoppingmall.category.model.response.CreateCategoryResponse;
import com.vision.shoppingmall.category.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CategoryService {
  private final CategoryRepository categoryRepository;

  public Page<CategoryListResponse> getCategories(int page) {
    PageRequest pageRequest = PageRequest.of(page, 10);
    Page<Category> categoryPage = categoryRepository.findAll(pageRequest);
    return categoryPage.map(category ->
        new CategoryListResponse(
            category.getId(), category.getCategoryName()));
  }

  public CreateCategoryResponse create(CreateCategoryRequest request) {
    if (categoryRepository.existsByCategoryName(request.getCategoryName()))
      throw new CategoryNameAlreadyExistsException();

    Category newCategory = Category.create(request);
    categoryRepository.save(newCategory);
    return new CreateCategoryResponse(newCategory);
  }

  public boolean isCategoryNameExists(String categoryName) {
    return categoryRepository.existsByCategoryName(categoryName);
  }

  public Optional<CategoryListResponse> getCategoryById(Long categoryId) {
    Category category = categoryRepository.findById(categoryId)
        .orElseThrow(() -> new CategoryNotFoundException());  // 카테고리가 없으면 예외 발생
    return Optional.of(new CategoryListResponse(
        category.getId(), category.getCategoryName()));
  }

}
