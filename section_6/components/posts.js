"use client";

import { formatDate } from '@/lib/format';
import LikeButton from './like-icon';
import { togglePostLikeStatus } from '@/actions/posts';
import { useOptimistic } from 'react';

function Post({ post, action }) {
  return (
    <article className="post">
      <div className="post-image">
        <img src={post.image} alt={post.title} />
      </div>
      <div className="post-content">
        <header>
          <div>
            <h2>{post.title}</h2>
            <p>
              Shared by {post.userFirstName} on{' '}
              <time dateTime={post.createdAt}>
                {formatDate(post.createdAt)}
              </time>
            </p>
          </div>
          <div>
            <form action={action.bind(null, post.id)} className={post.isLiked ? "liked" : ""}>
              <LikeButton  />
            </form>
          </div>
        </header>
        <p>{post.content}</p>
      </div>
    </article>
  );
}

export default function Posts({ posts }) {
  // 1. 초기에 쓸 데이터
  const [optimisticPosts, updateOptimisticPosts] = useOptimistic(posts, (prevPosts, upadtedPostId) => {

    // 2. 업데이트 된 데이터
    const updatedPostIndex = prevPosts.findIndex((post) => post.id === upadtedPostId);

    // 3. 업데이트 된 데이터가 없을 때
    // -1은 findIndex가 찾지 못했을 때 반환하는 값
    if (updatedPostIndex === -1) {
      return prevPosts;
    }

    const updatedPost = {...prevPosts[updatedPostIndex]};
    // 이미 좋아요를 누른 상태에서 다시 누르면 -1, 아니면 +1
    updatedPost.likes = !updatedPost.likes + (updatedPost.isLiked ? -1 : 1);

    // 좋아요 상태 변경
    updatedPost.isLiked = !updatedPost.isLiked;
    // 새로운 포스트 배열을 반환
    const newPosts = [...prevPosts];
    // 업데이트 된 포스트를 새로운 배열에 넣어줌
    newPosts[updatedPostIndex] = updatedPost;
    // 새로운 배열을 반환
    return newPosts;
  });
  
  if (!optimisticPosts || optimisticPosts.length === 0) {
    return <p>There are no posts yet. Maybe start sharing some?</p>;
  }

  const updatePost = async (postId) => {
    updateOptimisticPosts(postId);
    await togglePostLikeStatus(postId)
  };

  return (
    <ul className="posts">
      {optimisticPosts.map((post) => (
        <li key={post.id}>
          <Post post={post} action={updatePost}/>
        </li>
      ))}
    </ul>
  );
}
