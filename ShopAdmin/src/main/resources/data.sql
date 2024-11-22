INSERT INTO categories (category_name) VALUES ('소설');
INSERT INTO categories (category_name) VALUES ('경제');
INSERT INTO categories (category_name) VALUES ('자기개발');

INSERT INTO products (product_name, publisher_name, author_name, translator_name, purchase_price, unit_price, discount_price, selling_price, description, thumbnail_image_data, product_image_data, product_status, category_id)
VALUES ('채식주의자', '창비', '한강', null, 12000, 15000, 1500, 13500, '지식의 폭을 넓혀주는 책.', 'ThumbnailImageData3', 'ProductImageData3', 'Y', 3);

INSERT INTO products (product_name, publisher_name, author_name, translator_name, purchase_price, unit_price, discount_price, selling_price, description, thumbnail_image_data, product_image_data, product_status, category_id)
VALUES ('미움받을 용기', '인플루엔셜', '기시미 이치로', '전경아', 15000, 18000, 2000, 16000, '자기계발서로 유명한 책.', 'ThumbnailImageData1', 'ProductImageData1', 'Y', 1);

INSERT INTO products (product_name, publisher_name, author_name, translator_name, purchase_price, unit_price, discount_price, selling_price, description, thumbnail_image_data, product_image_data, product_status, category_id)
VALUES ('아몬드', '창비', '손원평', null, 12000, 15000, 1000, 14000, '감정이 없는 소년의 성장 이야기.', 'ThumbnailImageData2', 'ProductImageData2', 'Y', 2);

INSERT INTO products (product_name, publisher_name, author_name, translator_name, purchase_price, unit_price, discount_price, selling_price, description, thumbnail_image_data, product_image_data, product_status, category_id)
VALUES ('지적 대화를 위한 넓고 얕은 지식', '한빛비즈', '채사장', null, 17000, 20000, 3000, 18000, '지식의 폭을 넓혀주는 책.', 'ThumbnailImageData3', 'ProductImageData3', 'Y', 3);