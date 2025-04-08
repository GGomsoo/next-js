import { unstable_noStore } from 'next/cache'; 

import Messages from '@/components/messages';

// // 파일 전체에 캐싱 제어 구성하는 방법
// // revalidate = nextJS에서 명시적으로 찾는 상수
// // 해당 상수를 추가하면 fetch에서 설정을 하지 않아도 설정한 시간마다 재검증한다
// export const revalidate = 5;

// // 파일 전체에 캐싱을 전혀 하지 않도록 설정하는 상수
// // 기본값은 "auto"
// // force-dynamic = fetch 함수의 cache 옵션의 "no-store"와 동일한 역할
// // force-static = 캐싱을 강제함. 캐싱 안함
// export const dynamic = "force-dynamic";

export default async function MessagesPage() {
  // 캐싱을 하지 않도록 설정하는 함수
  // 특정 컴포넌트에 대해 캐싱을 막고 싶을 때 사용하면 유용
  unstable_noStore();

  const response = await fetch('http://localhost:8080/messages', {
    // // 새 요청을 항상 전송
    // // 그 요청의 응답 데이터를 사용하도록 강제
    // // 데이터를 캐싱, 재사용 하지말라고 설정하는 옵션
    // cache: "no-store"

    // // next 설정
    // // revalidate: 5, // 5초마다 재검증
    // next: {
    //   revalidate: 5,
    // }
  });
  const messages = await response.json();

  if (!messages || messages.length === 0) {
    return <p>No messages found</p>;
  }

  return <Messages messages={messages} />;
}
