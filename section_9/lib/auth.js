import { Lucia } from "lucia"
import { BetterSqlite3Adapter } from "@lucia-auth/adapter-sqlite"
import db from "./db";
import { cookies } from "next/headers";

const adapter = new BetterSqlite3Adapter(db, {
  user: "users",
  session: "sessions",
});

const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    }
  }
});

export const createAuthSession = async (userId) => {
  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);

  // response에 포함된 쿠키에 접근할 수 있도록 도와주는 함수
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
};

// 들어오는 요청이 인증된 사용자로부터 오는 요청인지 확인하는 함수
export const verifyAuth = async () => {
  const sessionCookie = cookies().get(lucia.sessionCookieName);
  // 세션 쿠키가 없으면 유저랑 세션을 null로 설정
  if (!sessionCookie) {
    return {
      user: null,
      session: null,
    };
  };

  const sessionId = sessionCookie.value;
  // 세션 ID가 없다면 사용자 데이터 없이 객체를 반환
  if (!sessionId) {
    return {
      user: null,
      session: null,
    };
  };

  // 유효한 세션인지 검증
  const result = await lucia.validateSession(sessionId);

  try {
    // 유효한 세션에 대해 세션 쿠키 설정
    if (result.session && result.session.fresh) {
      const sessionCookie = lucia.createSessionCookie(result.session.id);
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    }

    // 세션이 없을 경우 빈 세션 쿠키를 설정
    if (!result.session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    }
  } catch (err) { }
  return result;
};

export const destroySession = async () => {
  const { session } = await verifyAuth();

  // 세션이 없다 === 처음부터 세션 쿠키가 없다 === 인증되지 않았다
  if (!session) {
    return {
      error: "인증되지 않음"
    };
  };

  // 세션이 존재하는 경우 세션을 무효화
  // 세션을 무효화하면 DB에서 세션이 삭제됨
  await lucia.invalidateSession(session.id);
  // 세션 쿠키를 삭제
  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
}