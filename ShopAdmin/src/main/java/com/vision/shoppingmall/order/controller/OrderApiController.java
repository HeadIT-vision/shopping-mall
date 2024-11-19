package com.vision.shoppingmall.order.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/orders")
public class OrderApiController {

  @PostMapping()
  public ResponseEntity<Void> placeOrder() {
    return ResponseEntity.ok().build();
  }

  // PUT: /api/orders/{id}/cancellation, 주문 취소
  @PutMapping("/{id}/cancellation")
  public ResponseEntity<Void> cancelOrder() {
    return ResponseEntity.ok().build();
  }

  // PUT: /api/orders/{id}/completion, 배송 완료
  @PutMapping("/{id}/completion")
  public ResponseEntity<Void> completeShippment() {
    return ResponseEntity.ok().build();
  }

}
