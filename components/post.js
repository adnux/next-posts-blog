
import { formatDate } from '@/lib/format';
import LikeButton from './like-icon';
import Image from 'next/image';

function imageLoader(config) {
  const urlStart = config.src.split('upload/')[0];
  const urlEnd = config.src.split('upload/')[1];
  const transformations = `w_128,q_${config.quality}`;
  return `${urlStart}upload/${transformations}/${urlEnd}`;
}

export function Post({ post, action }) {
  return (
    <article className="post">
      <div className="post-image">
        <Image
          loader={imageLoader}
          src={post.image}
          width={200}
          height={120}
          alt={post.title}
          quality={50}
        />
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
            <form
              action={action.bind(null, post.id)}
              className={post.isLiked ? 'liked' : ''}
            >
              <LikeButton />
            </form>
          </div>
        </header>
        <p>{post.content}</p>
      </div>
    </article>
  );
}
