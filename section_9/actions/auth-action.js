"use server";

import { createAuthSession } from "@/lib/auth";
import { hashUserPassword } from "@/lib/hash";
import { createUser } from "@/lib/user";
import { redirect } from "next/navigation";

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

  // 해싱 처리 후 DB에 저장
  const hashedPassword = hashUserPassword(password);
  try {
    const id = createUser(email, hashedPassword);
    // 새로운 사용자가 생성될 때 마다 새로운 세션을 생성
    await createAuthSession(id);
    // 회원가입 다 통과하면 트레이닝 페이지로 리다이렉트
    redirect("/training");
  } catch (err) {
    // 이메일 중복에 대한 에러 문구 처리
    if (err.code === "SQLITE_CONSTRAINT_UNIQUE") {
      errors.email = "이미 사용중인 이메일이다!";
      return {
        errors: {
          email: "이미 사용중인 이메일이다!",
        }
      };
    }
    throw err;
  }
}