import Posts from '@/components/posts';
import { getPosts } from '@/lib/posts';

// 동적 메타데이터 생성
// 함수 이름은 무조건 아래와 같게 해야함
export const generateMetadata = async () => {
  const posts = await getPosts();
  const numberOfPosts = posts.length;
  return {
    title: `Browse all our (${numberOfPosts}) posts.`,
    description: `Browse all our posts`,
  };
};

export default async function FeedPage() {
  const posts = await getPosts();
  return (
    <>
      <h1>All posts by all users</h1>
      <Posts posts={posts} />
    </>
  );
}
