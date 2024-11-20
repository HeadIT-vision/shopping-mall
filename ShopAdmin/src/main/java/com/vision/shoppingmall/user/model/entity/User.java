package com.vision.shoppingmall.user.model.entity;

import com.vision.shoppingmall.user.model.request.SignUpRequest;
import jakarta.persistence.*;
import lombok.*;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private String email;

  @Column(nullable = false)
  private String userName;

  @Column(nullable = false)
  private String password;

  @Column(nullable = false)
  private String mobile;

  @Column(nullable = false)
  private String postCode;

  @Column(nullable = false)
  private String address;

  @Column(nullable = false)
  private String extraAddress;


  public static User signUp(SignUpRequest command, String encodedPassword) {
    return User.builder()
        .email(command.getEmail())
        .password(encodedPassword)
        .userName(command.getUserName())
        .mobile(command.getMobile())
        .postCode(command.getPostCode())
        .address(command.getAddress())
        .extraAddress(command.getExtraAddress())
        .build();
  }
}
