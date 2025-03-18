"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";

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
  }

  await saveMeal(meal);
  redirect("/meals");
};