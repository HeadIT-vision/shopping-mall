package com.vision.shoppingmall.product.repository;

import com.vision.shoppingmall.product.model.entity.Product;
import com.vision.shoppingmall.product.repository.search.ProductSearchRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>, ProductSearchRepository {
  Page<Product> findAll(Pageable pageable);
}
