package com.vision.shoppingmall.category.service;

import com.vision.shoppingmall.category.model.entity.Category;
import com.vision.shoppingmall.category.model.exception.CategoryHasProductsException;
import com.vision.shoppingmall.category.model.exception.CategoryNameAlreadyExistsException;
import com.vision.shoppingmall.category.model.exception.CategoryNotFoundException;
import com.vision.shoppingmall.category.model.request.CreateCategoryRequest;
import com.vision.shoppingmall.category.model.response.CategoryListResponse;
import com.vision.shoppingmall.category.model.response.CategoryResponse;
import com.vision.shoppingmall.category.model.response.CreateCategoryResponse;
import com.vision.shoppingmall.category.model.response.UpdateCategoryResponse;
import com.vision.shoppingmall.category.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CategoryService {
  private final CategoryRepository categoryRepository;

  @Transactional
  public Page<CategoryListResponse> getCategories(int page) {
    PageRequest pageRequest = PageRequest.of(page, 10);
    Page<Category> categoryPage = categoryRepository.findAll(pageRequest);
    return categoryPage.map(category ->
        new CategoryListResponse(
            category.getId(), category.getCategoryName(),
            category.getProducts() != null ? category.getProducts().size() : 0));
  }

  public CreateCategoryResponse create(CreateCategoryRequest request) {
    if (categoryRepository.existsByCategoryName(request.getCategoryName()))
      throw new CategoryNameAlreadyExistsException();

    Category newCategory = Category.create(request);
    categoryRepository.save(newCategory);
    return new CreateCategoryResponse(newCategory.getId(), newCategory.getCategoryName());
  }

  public CategoryResponse getCategoryById(Long categoryId) {
    Category category = categoryRepository.findById(categoryId)
        .orElseThrow(CategoryNotFoundException::new);

    return new CategoryResponse(category.getId(), category.getCategoryName());
  }

  public UpdateCategoryResponse update(Long categoryId, String categoryName) {
    Category category = categoryRepository.findById(categoryId)
        .orElseThrow(CategoryNotFoundException::new);
    if (categoryRepository.existsByCategoryNameAndIdNot(categoryName, categoryId))
      throw new CategoryNameAlreadyExistsException();

    category.update(categoryName);
    categoryRepository.save(category);
    return new UpdateCategoryResponse(category.getId(), category.getCategoryName());
  }

  @Transactional
  public void delete(Long categoryId) {
    Category category = categoryRepository.findById(categoryId)
        .orElseThrow(CategoryNotFoundException::new);
    if (category.getProducts() != null && !category.getProducts().isEmpty())
      throw new CategoryHasProductsException();

    categoryRepository.delete(category);
  }

}
