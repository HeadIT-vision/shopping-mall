package com.vision.shoppingmall.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/products")
public class ProductController {
//    public ProductController() {
//
//    }

    @GetMapping("")
    public String listProduct() {
        return "product/list"; // 경로가 정확히 맞는지 확인
    }

}
