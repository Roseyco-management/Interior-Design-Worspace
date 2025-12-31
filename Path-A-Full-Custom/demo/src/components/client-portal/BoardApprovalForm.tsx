'use client';

import { useState } from 'react';

interface BoardApprovalFormProps {
  boardId: string;
  boardStatus: 'draft' | 'pending' | 'approved' | 'revision_requested';
  onApprove: (feedback: string) => void;
  onRequestChanges: (feedback: string) => void;
}

export default function BoardApprovalForm({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  boardId,
  boardStatus,
  onApprove,
  onRequestChanges,
}: BoardApprovalFormProps) {
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState<'approved' | 'revision' | null>(null);

  const handleApprove = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    onApprove(feedback);
    setShowSuccess('approved');
    setIsSubmitting(false);
  };

  const handleRequestChanges = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    onRequestChanges(feedback);
    setShowSuccess('revision');
    setIsSubmitting(false);
  };

  // Show success message after approval/revision request
  if (showSuccess) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 dark:bg-gray-800 dark:border-gray-700">
        <div className="text-center py-8">
          <div
            className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${
              showSuccess === 'approved'
                ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                : 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400'
            }`}
          >
            {showSuccess === 'approved' ? (
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            )}
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {showSuccess === 'approved' ? 'Selections Approved!' : 'Revision Requested'}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            {showSuccess === 'approved'
              ? 'Thank you for approving these selections. Your designer will proceed with ordering the items.'
              : 'Your feedback has been sent to your designer. They will review your comments and provide updated selections.'}
          </p>
        </div>
      </div>
    );
  }

  // Show approved state (already approved, no actions needed)
  if (boardStatus === 'approved') {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center gap-3 text-green-600 dark:text-green-400">
          <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <p className="font-semibold">Selections Approved</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              You approved these selections. Your designer is proceeding with ordering.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Show revision requested state
  if (boardStatus === 'revision_requested') {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center gap-3 text-amber-600 dark:text-amber-400">
          <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <p className="font-semibold">Revision Requested</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              You requested changes for these selections. Your designer is working on updates.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Show approval form for pending boards
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 dark:bg-gray-800 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Your Feedback</h3>

      {/* Feedback Textarea */}
      <div className="mb-6">
        <label
          htmlFor="feedback"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Comments (optional)
        </label>
        <textarea
          id="feedback"
          rows={4}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Share any thoughts or questions about these selections..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleRequestChanges}
          disabled={isSubmitting}
          className="flex-1 px-6 py-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
        >
          {isSubmitting ? 'Sending...' : 'Request Changes'}
        </button>
        <button
          onClick={handleApprove}
          disabled={isSubmitting}
          className="flex-1 px-6 py-3 text-sm font-medium text-white bg-emerald-500 rounded-lg hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Approving...' : 'Approve Selections'}
        </button>
      </div>

      {/* Help Text */}
      <p className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center">
        By approving, you authorize your designer to proceed with ordering these items.
      </p>
    </div>
  );
}
