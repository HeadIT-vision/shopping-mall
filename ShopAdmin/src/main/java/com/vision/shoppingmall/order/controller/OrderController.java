package com.vision.shoppingmall.order.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/orders")
public class OrderController {

  //GET: /orders, 주문 목록 조회 페이지
  public String getOrderList() {
    return null;
  }

  //GET: /orders/{orderId}, 주문 상세 조회 페이지
  public String getOrderDetail() {
    return null;
  }
}
