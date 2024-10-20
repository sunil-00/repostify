import { supabase } from '@/lib/supabaseClient';

export const fetchPosts = async () => {
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    throw new Error('Error fetching posts: ' + error.message);
  }

  const postsWithOriginals = await Promise.all(
    posts.map(async (post) => {
      if (post.original_post_id) {
        const { data: originalPost, error: originalError } = await supabase
          .from('posts')
          .select('*')
          .eq('id', post.original_post_id)
          .single();

        if (originalError) throw originalError;

        return { ...post, original_post: originalPost, original_post_author: originalPost.user_id };
      }
      return post;
    })
  );

  return postsWithOriginals;
};

export const addPost = async (postData: {
  title: string;
  content: string;
  image: string | null;
  user_id: string;
}) => {
  const { error } = await supabase
    .from('posts')
    .insert([{ ...postData, like_count: 0, repost_count: 0 }]);

  if (error) {
    throw new Error('Error creating post: ' + error.message);
  }
};

export const addRepost = async (postData: {
  title: string;
  content: string;
  image: string | null;
  user_id: string;
  original_post_id: string;
}) => {
  const { error } = await supabase
    .from('posts')
    .insert([{ ...postData, like_count: 0, repost_count: 0 }]);

  if (error) {
    throw new Error('Error reposting post: ' + error.message);
  }
};

export const updatePostCounts = async (postId: string, field: 'like_count' | 'repost_count', currentCount: number) => {
  const { error } = await supabase
    .from('posts')
    .update({ [field]: currentCount + 1 })
    .eq('id', postId);

  if (error) {
    throw new Error(`Error updating post ${field}: ` + error.message);
  }
};
