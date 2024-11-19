package com.vision.shoppingmall.product.entity;

import com.vision.shoppingmall.category.model.entity.Category;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.math.BigInteger;

@NoArgsConstructor
@Data
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
    private Double purchasePrice;

    @Column(name = "unit_price", nullable = false)
    private Double unitPrice;

    @Column(name = "discount_price", precision = 10, scale = 2)
    private Double discountPrice;

    @Column(name = "selling_price", nullable = false)
    private Double sellingPrice;

    @Column(name = "description", nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(name = "thumbnail_image_data", nullable = false, columnDefinition = "TEXT")
    private String thumbnail_image_data;

    @Column(name = "product_image_data", nullable = false, columnDefinition = "TEXT")
    private String product_image_data;

    @Column(name = "product_status", nullable = false, length = 10)
    private String product_status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;
}
