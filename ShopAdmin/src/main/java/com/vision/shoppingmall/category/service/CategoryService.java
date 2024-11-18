package com.vision.shoppingmall.category.service;

import com.vision.shoppingmall.category.model.entity.Category;
import com.vision.shoppingmall.category.model.request.CreateCategoryRequest;
import com.vision.shoppingmall.category.model.response.CreateCategoryResponse;
import com.vision.shoppingmall.category.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CategoryService {

  private final CategoryRepository categoryRepository;

  public CreateCategoryResponse create(CreateCategoryRequest request) {

    Category newCategory = Category.create(request);
    categoryRepository.save(newCategory);
    return new CreateCategoryResponse(newCategory);
  }
}
