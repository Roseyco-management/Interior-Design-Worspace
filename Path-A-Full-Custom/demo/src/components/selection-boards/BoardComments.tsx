'use client';

import { useState } from 'react';
import { BoardComment } from '@/types/selection-board';

interface BoardCommentsProps {
  boardId: string;
  comments: BoardComment[];
  onAddComment?: (content: string) => void;
}

// Mock comments data
const mockComments: Record<string, BoardComment[]> = {
  '1': [
    {
      id: 'cm1',
      boardId: '1',
      author: { name: 'Sarah Mitchell', role: 'client' },
      content: 'Love the chandelier! Can we see a brass option for the pendants instead of chrome?',
      createdAt: '2024-12-28T10:30:00',
    },
    {
      id: 'cm2',
      boardId: '1',
      author: { name: 'AF Designs', role: 'designer' },
      content: "Absolutely! I've swapped them out. The brass complements the chandelier beautifully.",
      createdAt: '2024-12-28T14:15:00',
    },
  ],
  '2': [
    {
      id: 'cm3',
      boardId: '2',
      author: { name: 'James Wong', role: 'client' },
      content: 'The sofa looks great! Is it available in a darker gray?',
      createdAt: '2024-12-29T09:00:00',
    },
  ],
};

export default function BoardComments({ boardId, comments: initialComments, onAddComment }: BoardCommentsProps) {
  const [comments, setComments] = useState<BoardComment[]>(
    initialComments.length > 0 ? initialComments : mockComments[boardId] || []
  );
  const [newComment, setNewComment] = useState('');
  const [isPosting, setIsPosting] = useState(false);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handlePostComment = async () => {
    if (!newComment.trim()) return;

    setIsPosting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    const comment: BoardComment = {
      id: `cm-${Date.now()}`,
      boardId,
      author: { name: 'AF Designs', role: 'designer' },
      content: newComment.trim(),
      createdAt: new Date().toISOString(),
    };

    setComments((prev) => [...prev, comment]);
    setNewComment('');
    setIsPosting(false);

    if (onAddComment) {
      onAddComment(newComment.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handlePostComment();
    }
  };

  return (
    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Comments
      </h3>

      {/* Comments List */}
      <div className="space-y-4 mb-6">
        {comments.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            No comments yet. Start the conversation!
          </p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50"
            >
              <div className="flex items-center gap-2 mb-2">
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
                    comment.author.role === 'designer'
                      ? 'bg-brand-500'
                      : 'bg-gray-500'
                  }`}
                >
                  {comment.author.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <span className="font-medium text-gray-900 dark:text-white text-sm">
                    {comment.author.name}
                  </span>
                  {comment.author.role === 'designer' && (
                    <span className="ml-2 text-xs text-brand-500 font-medium">
                      Designer
                    </span>
                  )}
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {formatDate(comment.createdAt)}
                </span>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm pl-10">
                {comment.content}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Add Comment Form */}
      <div className="space-y-3">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a comment..."
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-500"
        />
        <div className="flex justify-end">
          <button
            onClick={handlePostComment}
            disabled={!newComment.trim() || isPosting}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isPosting ? (
              <>
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Posting...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
                Post Comment
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
