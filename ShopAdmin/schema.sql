ALTER TABLE products
    ADD CONSTRAINT FK_category_id
        FOREIGN KEY (category_id)
            REFERENCES categories (category_id)
            ON DELETE SET NULL;
