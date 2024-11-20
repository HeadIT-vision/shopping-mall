package com.vision.shoppingmall.user.model.request;

import lombok.Getter;

@Getter
public class SignUpRequest {
  private String email;
  private String password;
  private String passwordConfirm;
  private String userName;
  private String mobile;
  private String postCode;
  private String address;
  private String extraAddress;
}
