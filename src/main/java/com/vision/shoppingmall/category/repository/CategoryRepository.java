package com.vision.shoppingmall.category.repository;

import com.vision.shoppingmall.category.model.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
