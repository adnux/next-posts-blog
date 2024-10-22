'use client';

import { togglePostLikeStatus } from '@/actions/posts';
import { useOptimistic } from 'react';
import { Post } from './post';

export default function Posts({ posts }) {
  const [optimisticPosts, updateOptimisticPosts] = useOptimistic(posts, (prevPosts, updatedPostId) => {
    const updatedPostIndex = prevPosts.findIndex((post) => post.id === updatedPostId);

    if (updatedPostIndex === -1) {
      return prevPosts;
    }

    const updatedPost = {
      ...prevPosts[updatedPostIndex],
      likes: prevPosts[updatedPostIndex].likes + (prevPosts[updatedPostIndex].isLiked ? -1 : 1),
      isLiked: !prevPosts[updatedPostIndex].isLiked,
    };
    const newPosts = [...prevPosts];
    newPosts[updatedPostIndex] = updatedPost;
    return newPosts;
  })

  if (!optimisticPosts || optimisticPosts.length === 0) {
    return <p>There are no posts yet. Maybe start sharing some?</p>;
  }

  async function updatePost(postId) {
    updateOptimisticPosts(postId);
    await togglePostLikeStatus(postId);
  }

  return (
    <ul className="posts">
      {optimisticPosts.map((post) => (
        <li key={post.id}>
          <Post post={post} action={updatePost} />
        </li>
      ))}
    </ul>
  );
}
