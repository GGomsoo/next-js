"use server";

import { createUser } from "@/lib/user";

// 회원가입 서버 액션을 위한 함수
export const signup = async (prevState, formData) => {
  const email = formData.get("email");
  const password = formData.get("password");

  let errors = {};

  // 이메일 검증
  // 이메일에 "@"가 포함되어 있지 않을 경우 에러 메시지 추가
  if (!email || !email.includes("@")) {
    errors.email = "Please enter a valid email address.";
  };

  // 비밀번호 검증
  // 8자리 미만일 경우 에러 메시지 추가
  if (!password || password.trim().length < 8) {
    errors.password = "Password must be at least 8 characters long.";
  };

  // 에러 존재 여부 확인 후 return
  if (Object.keys(errors).length > 0) {
    return { 
      errors,
    };
  };

  // 이메일과 패스워드 검증 후 유효한 경우, DB에 저장
  // createUser(email, password) 로 바로 저장할 경우 패스워드가 평문으로 저장됨
  // 보안에 매우 안좋음.
  createUser(email, password);
}