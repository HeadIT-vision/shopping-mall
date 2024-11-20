package com.vision.shoppingmall.user.service;

import com.vision.shoppingmall.user.model.entity.User;
import com.vision.shoppingmall.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class SignUpPolicy {

  private final UserRepository repository;

  public void checkDuplicateEmail(String email) {
    if (repository.findByEmail(email).isPresent()) {
      throw new IllegalArgumentException("이미 사용 중인 이메일 입니다.");
    }
  }

  public void checkIfPhoneNumberIsUsedByAnotherAccount(String mobile) {
    Optional<User> foundUser = repository.findByMobile(mobile);
    if (foundUser.isPresent()) {
      throw new IllegalArgumentException("이미 사용 중인 전화번호 입니다.("+ foundUser.get().getEmail() +")");
    }
  }
}
