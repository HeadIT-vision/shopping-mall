package com.vision.shoppingmall.product.controller;

import com.vision.shoppingmall.category.model.response.CategoryListResponse;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/products")
public class ProductController {

    @GetMapping("")
    public String getProductList(Model model, @RequestParam(value = "page", defaultValue = "0") int page) {
//        Page<CategoryListResponse> paging = productService.getProducts(page);
//        model.addAttribute("paging", paging);
        return "product/list"; // 템플릿을 렌더링
    }
}
