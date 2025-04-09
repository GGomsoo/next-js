import db from "./db"

export const createUser = (email, password) => {
  // user 테이블에 새로운 값을 추가하려고 함
  // email과 password 필드를 설정
  // 값으로 2개의 플레이스 홀더를 넣어줌
  // run()에 구체적인 값 설정
  const result = db.prepare("INSERT INTO users (email, password) VALUES (?, ?)").run(email, password);
  
  // 새로 생성된 ID를 return
  return result.lastInsertRowid; 
};

// 이메일을 통해 사용자 정보를 호출
export const getUserByEmail = (email) => {
  return db.prepare("SELECT * FROM users WHERE email = ?").get(email);
};