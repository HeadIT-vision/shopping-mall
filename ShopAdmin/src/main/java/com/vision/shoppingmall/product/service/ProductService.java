package com.vision.shoppingmall.product.service;

import com.vision.shoppingmall.category.model.entity.Category;
import com.vision.shoppingmall.product.model.entity.ProductStatus;
import com.vision.shoppingmall.product.model.exception.ProductNotFoundException;
import com.vision.shoppingmall.category.model.exception.CategoryNotFoundException;
import com.vision.shoppingmall.category.repository.CategoryRepository;
import com.vision.shoppingmall.product.model.entity.Product;
import com.vision.shoppingmall.product.model.request.CreateProductRequest;
import com.vision.shoppingmall.product.model.request.UpdateProductRequest;
import com.vision.shoppingmall.product.model.response.CreateProductResponse;
import com.vision.shoppingmall.product.model.response.ProductListResponse;
import com.vision.shoppingmall.product.model.response.ProductResponse;
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
    Page<Product> productPage = productRepository.findByProductStatus(ProductStatus.ACTIVE, pageRequest);

    return productPage.map(ProductListResponse::from);
  }

  public CreateProductResponse create(CreateProductRequest request) {
    Category category = request.getCategoryId() != null
      ? categoryRepository.findById(request.getCategoryId())
        .orElseThrow(CategoryNotFoundException::new)
      : null;

    Product newProduct = Product.create(request, category);
    productRepository.save(newProduct);
    return CreateProductResponse.from(newProduct);
  }

  public ProductResponse getProductById(Long productId) {
    Product product = productRepository.findByIdAndProductStatus(productId, ProductStatus.ACTIVE)
        .orElseThrow(ProductNotFoundException::new);

    return ProductResponse.from(product);
  }

  public void updateProduct(UpdateProductRequest request) {
    Product product = productRepository.findByIdAndProductStatus(request.getId(), ProductStatus.ACTIVE)
        .orElseThrow(ProductNotFoundException::new);
    Category category = request.getCategoryId() != null
        ? categoryRepository.findById(request.getCategoryId())
        .orElseThrow(CategoryNotFoundException::new)
        : null;

    product.update(request, category);
    productRepository.save(product);
  }

  public void delete(Long productId) {
    Product product = productRepository.findByIdAndProductStatus(productId, ProductStatus.ACTIVE)
        .orElseThrow(ProductNotFoundException::new);
    product.delete();
    productRepository.save(product);
  }

}
