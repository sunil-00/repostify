import React, { useEffect, useState } from 'react';
import PostForm from '@/components/PostForm';
import PostList from '@/components/PostList';
import { fetchPosts, addPost, updatePostCounts, addRepost } from '@/services/postService';
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { Spinner } from '@/components/ui/spinner';

interface HomeProps {
  user: {
    id: string;
    email: string | null;
  };
}

interface Post {
  id: string;
  title: string;
  content: string;
  image: string | null;
  like_count: number;
  repost_count: number;
  original_post?: Post;
}

const Home: React.FC<HomeProps> = ({ user }) => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<'add' | 'repost'>('add');
  const [formTitle, setFormTitle] = useState<string>('Create Post');
  const [repostingPost, setRepostingPost] = useState<Post | null>(null);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const data = await fetchPosts();
      setPosts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleUpdatePostCount = async (postId: string, field: 'like_count' | 'repost_count', currentCount: number) => {
    try {
      await updatePostCounts(postId, field, currentCount);
      toast.success(
        field === 'like_count'
          ? `Successfully liked post`
          : `Successfully updated repost count`
      );
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? { ...post, [field]: post[field] + 1 }
            : post
        )
      );
    } catch (error) {
      console.error(error);
      toast.error('Error updating post count');
    }
  };

  const handleAddPost = async (title: string, content: string, image: string | null) => {
    try {
      await addPost({ title, content, image, user_id: user.id });
      toast.success('Post created successfully');
      setTimeout(() => {
        loadPosts();
      }, 1000);
    } catch (error) {
      console.error(error);
      toast.error('Error creating post');
      throw error;
    }
  };

  const handleRepost = async (title: string, content: string, image: string | null) => {
    if (!repostingPost) return;

    try {
      await addRepost({ title, content, image, user_id: user.id, original_post_id: repostingPost.id });
      await handleUpdatePostCount(repostingPost.id, 'repost_count', repostingPost.repost_count);

      toast.success('Post reposted successfully');
      setTimeout(() => {
        loadPosts();
      }, 1000);
    } catch (error) {
      console.error(error);
      toast.error('Error reposting post');
      throw error;
    }
  };

  const openModalForAdd = () => {
    setModalMode('add');
    setFormTitle('Create Post');
    setModalOpen(true);
  };

  const openModalForRepost = (post: any) => {
    setModalMode('repost');
    setFormTitle(`Repost "${post.title}"`);
    setRepostingPost(post);
    setModalOpen(true);
  };

  return (
    <>
      <div className="w-full flex flex-col justify-between mt-4 border-2 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Posts</h1>
          <Button onClick={openModalForAdd} variant="outline">
            Add Post
          </Button>
        </div>
        <PostForm
          formTitle={formTitle}
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onHandleSubmit={modalMode === 'add' ? handleAddPost : handleRepost}
        />
        { loading ? (
          <Spinner>Loading posts...</Spinner>
        ) : (
          <PostList posts={posts} onRepost={openModalForRepost} onUpdateCount={handleUpdatePostCount} />
        )}
      </div>
      <Toaster position='top-right' closeButton />
    </>
  );
};

export default Home;
