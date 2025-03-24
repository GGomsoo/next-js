"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

// 빈 문자열인지 검증
const isInvalidText = (text) => {
  return !text || text.trim() === "";
};

// form과 연결, form에서 action을 사용하여 서버로 데이터를 전송
// *추가: shareMeal 함수는 2개의 인자를 받는다
// 1. 이전 상태값 (prevState) -> 이전 상태값을 사용하지 않는 경우도 있음
// 2. form 데이터 (formData) -> form 데이터를 meal 객체로 변환
export const shareMeal = async (prevState, formData) => {
  // form 데이터를 meal 객체로 변환
  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };

  // 필수 입력칸 및 제출 양식 검증
  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes("@") ||
    !meal.image || meal.image.size === 0
  ) {
    return {
      message: "Invalid input."
    };
  }

  await saveMeal(meal);
  // 특정 경로에 속하는 캐시의 유효성 재검사를 요청하는 NextJS에서 제공하는 함수
  // 두번째 인자로 layout, page 옵션이 있음
  // page: 해당 경로만 검사하겠다
  // layout: 중첩된 모든 경로의 페이지를 검사하겠다
  revalidatePath("/meals");
  redirect("/meals");
};