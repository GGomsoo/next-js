import { cache } from 'react';
import { unstable_cache as nextCache } from 'next/cache';
import sql from 'better-sqlite3';

const db = new sql('messages.db');

function initDb() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY, 
      text TEXT
    )`);
}

initDb();

export function addMessage(message) {
  db.prepare('INSERT INTO messages (text) VALUES (?)').run(message);
}

// react의 cache를 사용하여
// 중복 제거가 되야하는 함수를 cache로 감싼다

// next에서 제공하는 unstable_cache를 사용
// 2개의 인자를 받는다. (캐싱할 데이터, 캐싱할 키를 설정하는 배열)
// 추가로 1개의 인자를 더 받는데, revalidate 혹은 tags를 설정할 수 있다
// Promise를 반환하기 때문에 async/await 를 사용해야 한다
export const getMessages = nextCache(
  cache(function getMessages() {
    console.log('Fetching messages from db');
    return db.prepare('SELECT * FROM messages').all();
  }), ["messages"], {
    tags: ["msg"],
  }
);
