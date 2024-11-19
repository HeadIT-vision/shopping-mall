package com.vision.shoppingmall.product.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/products")
public class ProductController {

    // GET:/list, "상품 목록 조회 페이지"
    @GetMapping("")
    public String getProductList() {
        return "product/list"; // 경로가 정확히 맞는지 확인
    }

    // GET:/new-form, "상품 등록 페이지"
    @GetMapping("/new-product")
    public String createProductForm() {
        return null;
    }

    @PostMapping("/new-product")
    public String createProduct() {
        return null;
    }

    // GET:/update-form, "상품 수정 페이지"
    @GetMapping("/update-product")
    public String updateProductForm() {
        return null;
    }

    @PostMapping("/update-product")
    public String updateProduct() {
        return null;
    }
}
