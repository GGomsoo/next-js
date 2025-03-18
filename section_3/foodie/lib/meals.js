// sql import
import fs from "node:fs"
import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";

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

// 식사 정보 저장
export const saveMeal = async (meal) => {
  // title 모든 문자 소문자로 설정
  meal.slug = slugify(meal.title, { lower: true});

  // 사용자 입력값을 필터링하여 XSS 공격을 방지
  meal.instructions = xss(meal.instructions);

  // 사용자의 파일명을 사용하지 않고
  // slug를 사용하여 파일명을 생성
  const extension = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}.${extension}`

  // 이미지 파일을 저장
  // fs의 createWriteStream을 사용하여 이미지 파일을 해당 경로에 저장
  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await meal.image.arrayBuffer();

  // write 함수의 구성: 저장할 파일, 쓰기를 마치면 실행될 함수
  stream.write(Buffer.from(bufferedImage), (err) => {
    if (err) {
      throw new Error("Saving image failed");
    }
  });

  meal.image = `/images/${fileName}`

  // DB에 데이터 저장
  // INSERT에 사용할 데이터와 VALUES의 순서가 일치해야 한다
  db.prepare(`
    INSERT INTO meals
    (title, summary, instructions, image, creator, creator_email, slug)
    VALUES
    (@title, @summary, @instructions, @image, @creator, @creator_email, @slug)
    `).run(meal);
};