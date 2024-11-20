package com.vision.shoppingmall.user.controller;

import com.vision.shoppingmall.user.model.request.SignUpRequest;
import com.vision.shoppingmall.user.model.response.SignUpResponse;
import com.vision.shoppingmall.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserApiController {

  private final UserService service;

  @PostMapping("authorization")
  public ResponseEntity<Void> authorizeUser() {
    return null;
  }

  @PostMapping("authentication")
  public ResponseEntity<Void> authenticateUser() {
    return null;
  }

  @PostMapping("signup")
  public ResponseEntity<SignUpResponse> signUp(
    @RequestBody SignUpRequest request) {
    return ResponseEntity.ok(service.signUp(request));
  }
}
