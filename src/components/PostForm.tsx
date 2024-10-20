import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface PostFormProps {
  formTitle?: string;
  isOpen: boolean;
  onClose: () => void;
  onHandleSubmit: (title: string, content: string, image: string | null) => void;
}

const PostForm: React.FC<PostFormProps> = ({ formTitle='Create Post', isOpen, onClose, onHandleSubmit }) => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    try {
      await onHandleSubmit(title, content, image);
      setTitle('');
      setContent('');
      setImage('');
      onClose();
    } catch (error: any) {
      debugger;
      setError(error.message);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="space-y-4">
        <DialogTitle className="text-2xl font-bold">{formTitle}</DialogTitle>
        <DialogDescription className="text-sm">
          {formTitle === 'Create Post' ? 'Fill out the form below to create a new post.' : 'Fill out the form below to repost the post.'}
        </DialogDescription>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="block w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="block w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block">Image URL (optional)</label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="block w-full p-2 border rounded"
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-500 rounded"
          >
            {formTitle === 'Create Post' ? 'Create' : 'Repost'}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PostForm;

