import React from 'react';
import PostItem from '@/components/PostItem';

interface Post {
  id: string;
  title: string;
  content: string;
  image: string | null;
  like_count: number;
  repost_count: number;
  original_post?: Post;
}

interface PostListProps {
  posts: Post[];
  onRepost: (post: Post) => void;
  onUpdateCount: (postId: string, field: 'like_count' | 'repost_count', currentCount: number) => void;
}

const PostList: React.FC<PostListProps> = ({ posts, onRepost, onUpdateCount }) => {
  return (
    <div className="mt-6">
      <div className="mx-auto w-full md:w-1/2 flex flex-col gap-4">
        {posts.map(post => (
          <PostItem key={post.id} post={post} onRepost={onRepost} onUpdateCount={onUpdateCount} />
        ))}
      </div>
    </div>
  );
};

export default PostList;
