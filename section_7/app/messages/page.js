import Messages from '@/components/messages';

export default async function MessagesPage() {
  const response = await fetch('http://localhost:8080/messages', {
    // // 새 요청을 항상 전송
    // // 그 요청의 응답 데이터를 사용하도록 강제
    // // 데이터를 캐싱, 재사용 하지말라고 설정하는 옵션
    // cache: "no-store"

    // next 설정
    // revalidate: 5, // 5초마다 재검증
    next: {
      revalidate: 5,
    }
  });
  const messages = await response.json();

  if (!messages || messages.length === 0) {
    return <p>No messages found</p>;
  }

  return <Messages messages={messages} />;
}
