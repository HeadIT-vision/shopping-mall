package com.vision.shoppingmall.product.controller;

import com.vision.shoppingmall.category.model.response.CategoryListResponse;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/products")
public class ProductController {

    // GET:/list, "상품 목록 조회 페이지"
    @GetMapping("")
    public String getProductList(Model model, @RequestParam(value = "page", defaultValue = "0") int page) {
//        Page<CategoryListResponse> paging = productService.getProducts(page);
//        model.addAttribute("paging", paging);
        return "product/list"; // 템플릿을 렌더링
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
