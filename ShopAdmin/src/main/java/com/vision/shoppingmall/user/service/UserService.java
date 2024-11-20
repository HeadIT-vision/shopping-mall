package com.vision.shoppingmall.user.service;

import com.vision.shoppingmall.user.model.entity.User;
import com.vision.shoppingmall.user.model.request.SignUpRequest;
import com.vision.shoppingmall.user.model.response.SignUpResponse;
import com.vision.shoppingmall.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserService {

  private final UserRepository repository;
  private final SignUpPolicy policy;
//  private final BCryptPasswordEncoder passwordEncoder;

  public SignUpResponse signUp(SignUpRequest command) {

    User newUser = User.signUp(command, command.getPassword());

    policy.checkDuplicateEmail(newUser.getEmail());
    policy.checkIfPhoneNumberIsUsedByAnotherAccount(newUser.getMobile());

    return SignUpResponse.fromEntity(repository.save(newUser));
  }
}
