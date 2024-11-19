package com.vision.shoppingmall.product.service;

import com.vision.shoppingmall.product.model.entity.Product;
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
  
  public Page<ProductListResponse> getProducts(int page) {
    PageRequest pageRequest = PageRequest.of(page, 10);
    Page<Product> productPage = productRepository.findAll(pageRequest);

    return productPage.map(
      product -> new ProductListResponse(product.getId(), product.getProductName(), product.getPublisherName(),
        product.getAuthorName(), product.getPurchasePrice(), product.getUnitPrice(), product.getUnitPrice(),
        product.getSellingPrice()));
    }

}
