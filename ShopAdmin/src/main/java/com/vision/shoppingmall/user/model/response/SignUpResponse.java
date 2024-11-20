package com.vision.shoppingmall.user.model.response;

import com.vision.shoppingmall.user.model.entity.User;

public record SignUpResponse(
    Long id,
    String email,
    String name,
    String mobile,
    String postCode,
    String address,
    String extraAddress
) {
  public static SignUpResponse fromEntity(User user) {
    return new SignUpResponse(
        user.getId(),
        user.getEmail(),
        user.getUserName(),
        user.getMobile(),
        user.getPostCode(),
        user.getAddress(),
        user.getExtraAddress()
    );
  }
}
