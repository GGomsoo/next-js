// 라우트 핸들러 설정
// api 같은 라우트를 설정, 클라이언트에서 내부적으로 호출

export const GET = (request) => {
  console.log(request);
  return new Response("Hello!")
};


// export const POST = (request) => {
//   console.log(request);
// }