package com.vision.shoppingmall.category.model.entity;

import com.vision.shoppingmall.category.model.request.CreateCategoryRequest;
import com.vision.shoppingmall.product.model.entity.Product;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.List;

@Entity(name = "categories")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class Category {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "category_id")
  private Long id;

  @Column(name = "category_name", nullable = false, unique = true)
  private String categoryName;

  @OneToMany(mappedBy = "category", fetch = FetchType.LAZY)
  @OnDelete(action = OnDeleteAction.SET_NULL)
  private List<Product> products;

  public static Category create(CreateCategoryRequest command) {
    return Category.builder()
        .categoryName(command.getCategoryName())
        .build();
  }

  public void update(String categoryName) {
    this.categoryName = categoryName;
  }
}
