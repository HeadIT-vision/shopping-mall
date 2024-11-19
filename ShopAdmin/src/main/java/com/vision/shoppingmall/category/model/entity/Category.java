package com.vision.shoppingmall.category.model.entity;

import com.vision.shoppingmall.category.model.request.CreateCategoryRequest;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigInteger;

@Entity(name = "categories")
@NoArgsConstructor
@Data
public class Category {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "category_id")
  private Long id;

  @Column(name = "category_name", nullable = false, unique = true)
  private String categoryName;

  public static Category create(CreateCategoryRequest command) {
    Category category = new Category();
    category.categoryName = command.getCategoryName();
    return category;
  }
}
