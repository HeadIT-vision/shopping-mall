package com.vision.shoppingmall.product.controller;

import com.vision.shoppingmall.category.model.response.CategoryListResponse;
import com.vision.shoppingmall.category.service.CategoryService;
import com.vision.shoppingmall.product.model.request.CreateProductRequest;
import com.vision.shoppingmall.product.model.request.UpdateProductRequest;
import com.vision.shoppingmall.product.model.response.ProductListResponse;
import com.vision.shoppingmall.product.model.response.ProductResponse;
import com.vision.shoppingmall.product.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;
    private final CategoryService categoryService;

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
        List<CategoryListResponse> categories = categoryService.getAllCategories();
        model.addAttribute("product", new CreateProductRequest());
        model.addAttribute("categories", categories);
        return "product/product-form";
    }

    // POST:/new-form, "상품 등록"
    @PostMapping("/new-product")
    public String createProduct(@ModelAttribute("product") @Valid CreateProductRequest request, BindingResult bindingResult, Model model) {
        if(bindingResult.hasErrors()) {
            List<CategoryListResponse> categories = categoryService.getAllCategories();
            model.addAttribute("product", request);
            model.addAttribute("categories", categories);
            return "product/product-form";
        }
        productService.create(request);
        return "redirect:/products";
    }

    // GET:/update-form/{id}, "상품 수정 페이지"
    @GetMapping("/update-product/{id}")
    public String updateProductForm(@PathVariable("id") Long productId, Model model) {
        ProductResponse product = productService.getProductById(productId);
        List<CategoryListResponse> categories = categoryService.getAllCategories();
        model.addAttribute("product", product);
        model.addAttribute("categories", categories);
        return "product/product-form";
    }

    // Post:/update-form/{id}, "상품 수정"
    @PostMapping("/update-product/{id}")
    public String updateProduct(@PathVariable("id") Long productId, @ModelAttribute("product") @Valid UpdateProductRequest request, BindingResult bindingResult, Model model) {
        if(bindingResult.hasErrors()) {
            List<CategoryListResponse> categories = categoryService.getAllCategories();
            model.addAttribute("product", request);
            model.addAttribute("categories", categories);
            return "product/product-form";
        }

        productService.updateProduct(request);
        return "redirect:/products";
    }
}
