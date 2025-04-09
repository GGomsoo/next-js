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