package com.vision.shoppingmall.product.model.entity;

import com.vision.shoppingmall.category.model.entity.Category;
import com.vision.shoppingmall.product.model.request.CreateProductRequest;
import com.vision.shoppingmall.product.model.request.UpdateProductRequest;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "products")
public class Product {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "product_id", nullable = false, unique = true)
  private Long id;

  @Column(name = "product_name", nullable = false, length = 50)
  private String productName;

  @Column(name = "publisher_name", nullable = false, length = 50)
  private String publisherName;

  @Column(name = "author_name", nullable = false, length = 50)
  private String authorName;

  @Column(name = "translator_name", length = 50)
  private String translatorName;

  @Column(name = "purchase_price", nullable = false)
  private int purchasePrice;

  @Column(name = "unit_price", nullable = false)
  private int unitPrice;

  @Column(name = "discount_price")
  private int discountPrice;

  @Column(name = "selling_price", nullable = false)
  private int sellingPrice;

  @Column(name = "description", nullable = false, columnDefinition = "TEXT")
  private String description;

  @Column(name = "thumbnail_image_data", nullable = false, columnDefinition = "LONGTEXT")
  private String thumbnailImageData;

  @Column(name = "product_image_data", nullable = false, columnDefinition = "LONGTEXT")
  private String productImageData;

  @Convert(converter = ProductStatusConverter.class)
  @Column(name = "product_status", nullable = false, length = 10)
  private ProductStatus productStatus;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "category_id", nullable = true, foreignKey = @ForeignKey(name = "fk_product_category", foreignKeyDefinition = "FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE SET NULL"))
  private Category category;

  public static Product create(CreateProductRequest command, Category category) {
    return Product.builder()
        .productName(command.getProductName())
        .publisherName(command.getPublisherName())
        .authorName(command.getAuthorName())
        .translatorName(command.getTranslatorName())
        .description(command.getDescription())
        .purchasePrice(command.getPurchasePrice())
        .unitPrice(command.getUnitPrice())
        .sellingPrice(command.getSellingPrice())
        .thumbnailImageData(command.getThumbnailImageData())
        .productImageData(command.getDetailImageData())
        .productStatus(ProductStatus.ACTIVE)
        .category(category)
        .build();
  }

  public void update(UpdateProductRequest command, Category category) {
    this.productName = command.getProductName();
    this.category = category;
    this.publisherName = command.getPublisherName();
    this.authorName = command.getAuthorName();
    this.translatorName = command.getTranslatorName();
    this.description = command.getDescription();
    this.purchasePrice = command.getPurchasePrice();
    this.unitPrice = command.getUnitPrice();
    this.discountPrice = command.getDiscountPrice();
    this.sellingPrice = command.getSellingPrice();
    this.thumbnailImageData = command.getThumbnailImageData();
    this.productImageData = command.getDetailImageData();
  }

  public void delete() {
    this.productStatus = ProductStatus.INACTIVE;
  }
}
