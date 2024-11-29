package com.vision.shoppingmall.product.repository.search;

import com.querydsl.core.QueryResults;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPQLQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.vision.shoppingmall.category.model.entity.QCategory;
import com.vision.shoppingmall.product.model.entity.Product;
import com.vision.shoppingmall.product.model.entity.QProduct;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Objects;

import static java.util.Objects.*;

@Repository
public class ProductSearchRepositoryImpl extends QuerydslRepositorySupport implements ProductSearchRepository {
  private final JPAQueryFactory queryFactory;
  public ProductSearchRepositoryImpl(JPAQueryFactory queryFactory) {
    super(Product.class); // super(Product.class) 필수
    this.queryFactory = queryFactory;
  }

  @Override
  public Page<Product> getProductsBy(Pageable pageable, String title, Long categoryId) {
    QProduct product = QProduct.product;
    QCategory category = QCategory.category;

    // Querydsl을 사용하여 쿼리 작성
    JPQLQuery<Product> query = from(product)
        .leftJoin(product.category, category)
        .where(
            titleEq(title),
            categoryIdEq(categoryId)
        );

    // 페이징 처리
    List<Product> content = requireNonNull(getQuerydsl()).applyPagination(pageable, query).fetch();
    long totalCount = query.fetchCount();  // 전체 갯수 계산

    return new PageImpl<>(content, pageable, totalCount);
  }

  private BooleanExpression titleEq(String title) {
    return title != null ? QProduct.product.productName.contains(title) : null;
  }

  private BooleanExpression categoryIdEq(Long categoryId) {
    return categoryId != null ? QProduct.product.category.id.eq(categoryId) : null;
  }

}
