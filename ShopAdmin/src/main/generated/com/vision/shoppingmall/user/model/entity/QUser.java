package com.vision.shoppingmall.user.model.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QUser is a Querydsl query type for User
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QUser extends EntityPathBase<User> {

    private static final long serialVersionUID = 34478759L;

    public static final QUser user = new QUser("user");

    public final StringPath address = createString("address");

    public final StringPath email = createString("email");

    public final StringPath extraAddress = createString("extraAddress");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath mobile = createString("mobile");

    public final StringPath password = createString("password");

    public final StringPath postCode = createString("postCode");

    public final StringPath userName = createString("userName");

    public QUser(String variable) {
        super(User.class, forVariable(variable));
    }

    public QUser(Path<? extends User> path) {
        super(path.getType(), path.getMetadata());
    }

    public QUser(PathMetadata metadata) {
        super(User.class, metadata);
    }

}
