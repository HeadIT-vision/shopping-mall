package com.vision.shoppingmall.category.model.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QCategory is a Querydsl query type for Category
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QCategory extends EntityPathBase<Category> {

    private static final long serialVersionUID = 1628582477L;

    public static final QCategory category = new QCategory("category");

    public final StringPath categoryName = createString("categoryName");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final ListPath<com.vision.shoppingmall.product.model.entity.Product, com.vision.shoppingmall.product.model.entity.QProduct> products = this.<com.vision.shoppingmall.product.model.entity.Product, com.vision.shoppingmall.product.model.entity.QProduct>createList("products", com.vision.shoppingmall.product.model.entity.Product.class, com.vision.shoppingmall.product.model.entity.QProduct.class, PathInits.DIRECT2);

    public QCategory(String variable) {
        super(Category.class, forVariable(variable));
    }

    public QCategory(Path<? extends Category> path) {
        super(path.getType(), path.getMetadata());
    }

    public QCategory(PathMetadata metadata) {
        super(Category.class, metadata);
    }

}
