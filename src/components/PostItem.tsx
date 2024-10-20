import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Adjust imports as necessary

interface Post {
  id: string;
  title: string;
  content: string;
  image: string | null;
  like_count: number;
  repost_count: number;
  original_post?: Post;
}

interface PostItemProps {
  post: Post;
  onRepost: (post: Post) => void;
  onUpdateCount: (postId: string, field: 'like_count' | 'repost_count', currentCount: number) => void;
}

const PostItem: React.FC<PostItemProps> = ({ post, onRepost, onUpdateCount }) => {
  return (
    <Card className="border p-4 rounded shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{post.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-base md:text-lg">{post.content}</p>
        {post.image && (
          <img
            src={post.image}
            alt={post.title}
            className="mt-2 w-full h-auto rounded-md object-cover max-h-72"
          />
        )}

        {post.original_post && (
          <div className="border-t mt-4 pt-4">
            <Card className="bg-gray-100">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Original Post</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base md:text-lg">{post.original_post.title}</p>
                <p className="text-base md:text-lg">{post.original_post.content}</p>
                {post.original_post.image && (
                  <img
                    src={post.original_post.image}
                    alt="Original post image"
                    className="mt-2 w-full h-auto rounded-md object-cover max-h-72"
                  />
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mt-4">
        <div className="flex space-x-4 mb-2 sm:mb-0">
          <Button
            onClick={() => onUpdateCount(post.id, 'like_count', post.like_count)}
            variant="outline"
            className="hover:bg-gray-100 flex-1"
          >
            Like
          </Button>
          <Button
            onClick={() => onRepost(post)}
            variant="outline"
            className="hover:bg-gray-100 flex-1"
          >
            Repost
          </Button>
        </div>
        <p className="text-gray-500 text-center sm:text-right">
          Likes: {post.like_count} | Reposts: {post.repost_count}
        </p>
      </div>
    </Card>
  );
};

export default PostItem;
