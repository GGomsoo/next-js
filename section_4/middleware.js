import { NextResponse } from "next/server"

// 수신하는 요청을 살펴보고 변경하거나 차단
// 인증을 구현
// 다른 페이지로 리다이렉트
export const middleware = (req) => {
  console.log(req);
  return NextResponse.next();
};

export const config = {
  matcher: "/news"
}