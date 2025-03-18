// sql import
import sql from "better-sqlite3";
import { resolve } from "styled-jsx/css";

// DB의 이름을 문자열로 sql 함수에 전달
const db = sql("meals.db");

export const getMeals = async () => {
  // 임의로 추가 지연 생성
  // State(상태) 로딩 다룰 때 도움
  await new Promise((resolve) => setTimeout(resolve, 2000));
  
  // throw new Error("Loading meals failed");
  // all: 데이터를 불러올 때
  // run: 데이터를 주입시킬 때
  // get: 한가지 열만 찾고싶을 때
  return db.prepare("SELECT * FROM meals").all();
}

// 가져와야하는 식사 정보 (slug)
// WHERE slug가  위의 slug와 동일 해야한다
// 이 때 '?'를 placeholder로 사용 (SQL Injection 방지)
export const getMeal = (slug) => {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
}