import PostForm from '@/components/post-form';
import { storePost } from '@/lib/posts';
import { redirect } from 'next/navigation';

export default function NewPostPage() {
  async function createPost(prevState, formData) {
    // 170
    // 해당 함수를 서버 액션으로 만들기 위해서
    // 함수 안에 "use server"를 추가해야 한다.
    "use server";
    const title = formData.get('title');
    const image = formData.get('image');
    const content = formData.get('content');

    let errors = [];

    if (!title || !title.trim().length === 0) {
      errors.push('Title is required');
    };

    if (!content || !content.trim().length === 0) {
      errors.push('Content is required');
    };

    if (!image || image.size === 0) {
      errors.push('Image is required');
    };

    if (errors.length > 0) {
      // 174
      // 에러가 있는 객체를 반환하여
      // 클라이언트 측에서 해결 할 수 있음
      return { errors };
    }

    await storePost({
      imageUrl: '',
      title,
      content,
      userId: 1
    })

    redirect("/feed");
  };

  return (
    <PostForm action={createPost}/>
  );
};
