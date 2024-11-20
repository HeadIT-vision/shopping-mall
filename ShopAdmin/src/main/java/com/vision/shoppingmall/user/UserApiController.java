package com.vision.shoppingmall.user;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserApiController {

  @PostMapping("authorization")
  public ResponseEntity<Void> authorizeUser() {
    return null;
  }

  @PostMapping("authentication")
  public ResponseEntity<Void> authenticateUser() {
    return null;
  }

  @PostMapping("signup")
  public ResponseEntity<Void> signUp() {
    return null;
  }

}
