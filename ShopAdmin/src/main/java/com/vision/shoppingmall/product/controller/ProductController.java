package com.vision.shoppingmall.product.controller;

import com.vision.shoppingmall.category.service.CategoryService;
import com.vision.shoppingmall.product.model.request.CreateProductRequest;
import com.vision.shoppingmall.product.model.response.ProductListResponse;
import com.vision.shoppingmall.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    // GET:/list, "상품 목록 조회 페이지"
    @GetMapping("")
    public String getProductList(Model model, @RequestParam(value = "page", defaultValue = "0") int page) {
        Page<ProductListResponse> paging = productService.getProducts(page);
        model.addAttribute("paging", paging);
        return "product/list"; // 템플릿을 렌더링
    }

    // GET:/new-form, "상품 등록 페이지"
    @GetMapping("/new-product")
    public String createProductForm(Model model) {
        model.addAttribute("pageTitle", "상품 등록");
        return "product/product-form";
    }

    @PostMapping("/new-product")
    public String createProduct(@ModelAttribute CreateProductRequest request) {
        productService.create(request);  // 저장
        return "redirect:/product/list";
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
