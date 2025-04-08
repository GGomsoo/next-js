import { redirect } from 'next/navigation';

import { addMessage } from '@/lib/messages';
import { revalidatePath, revalidateTag } from 'next/cache';

export default function NewMessagePage() {
  async function createMessage(formData) {
    'use server';

    const message = formData.get('message');
    // addMessage(message);
    // 해당 태그가 있는 모든 캐시된 데이터를 재검증하고 폐기
    // 태그는 react-query에서 queryKey와 비슷한 느낌
    // 해당 함수의 역할은 react-query의 invalidateQueries와 비슷한 느낌
    revalidateTag("msg");
    redirect('/messages');
  }

  return (
    <>
      <h2>New Message</h2>
      <form action={createMessage}>
        <p className="form-control">
          <label htmlFor="message">Your Message</label>
          <textarea id="message" name="message" required rows="5" />
        </p>

        <p className="form-actions">
          <button type="submit">Send</button>
        </p>
      </form>
    </>
  );
}
