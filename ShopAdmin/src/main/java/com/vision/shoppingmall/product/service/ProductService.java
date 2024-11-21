package com.vision.shoppingmall.product.service;

import com.vision.shoppingmall.category.model.entity.Category;
import com.vision.shoppingmall.category.model.exception.CategoryNotFoundException;
import com.vision.shoppingmall.category.repository.CategoryRepository;
import com.vision.shoppingmall.product.model.entity.Product;
import com.vision.shoppingmall.product.model.request.CreateProductRequest;
import com.vision.shoppingmall.product.model.response.CreateProductResponse;
import com.vision.shoppingmall.product.model.response.ProductListResponse;
import com.vision.shoppingmall.product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductService {
  private final ProductRepository productRepository;
  private final CategoryRepository categoryRepository;
  
  public Page<ProductListResponse> getProducts(int page) {
    PageRequest pageRequest = PageRequest.of(page, 10);
    Page<Product> productPage = productRepository.findAll(pageRequest);

    return productPage.map(
      product -> new ProductListResponse(product.getId(), product.getProductName(), product.getPublisherName(),
        product.getAuthorName(), product.getTranslatorName(), product.getPurchasePrice(), product.getUnitPrice(), product.getUnitPrice(),
        product.getSellingPrice()));
  }

  public CreateProductResponse create(CreateProductRequest request) {
    Category category = categoryRepository.findById(request.getCategoryId())
        .orElseThrow(CategoryNotFoundException::new);

    Product newProduct = Product.create(request, category);
    productRepository.save(newProduct);
    return CreateProductResponse.from(newProduct);
  }

}