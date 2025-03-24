"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";

// 빈 문자열인지 검증
const isInvalidText = (text) => {
  return !text || text.trim() === "";
};

// form과 연결, form에서 action을 사용하여 서버로 데이터를 전송
export const shareMeal = async (formData) => {
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
    throw new Error("Invalid input");
  }

  await saveMeal(meal);
  redirect("/meals");
};