import Posts from '@/components/posts';
import { getPosts } from '@/lib/posts';
import { Suspense } from 'react';

export async function generateMetadata() {
  const posts = await getPosts();
  const numberOfPosts = posts.length;
  return {
    title: `Browse all our ${numberOfPosts} posts.`,
    description: 'Browse all our posts.'
  }
}

export default async function FeedPage() {
  const posts = await getPosts();
  return (
    <>
      <h1>All posts by all users</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <Posts posts={posts} />
      </Suspense>
    </>
  );
}
