package com.vision.shoppingmall.product.repository.search;

import com.vision.shoppingmall.product.model.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProductSearchRepository {
  Page<Product> getProductsBy(Pageable pageable, String title, Long categoryId);
}
