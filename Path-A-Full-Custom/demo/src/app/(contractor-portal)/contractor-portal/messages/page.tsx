'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

interface Message {
  id: string;
  sender: string;
  senderRole: string;
  senderInitials: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  project?: string;
}

const mockMessages: Message[] = [
  {
    id: 'm1',
    sender: 'Amanda Foster',
    senderRole: 'Lead Designer',
    senderInitials: 'AF',
    content: 'Hi Mike! Just wanted to confirm the pendant lights arrived for the Johnson project. Can you let me know when you plan to install them?',
    timestamp: '2024-12-30T10:30:00',
    isRead: false,
    project: 'Johnson Kitchen Remodel'
  },
  {
    id: 'm2',
    sender: 'Sarah Johnson',
    senderRole: 'Client',
    senderInitials: 'SJ',
    content: "Thank you for the great work yesterday! The cabinet installation looks perfect.",
    timestamp: '2024-12-29T15:45:00',
    isRead: true,
    project: 'Johnson Kitchen Remodel'
  },
  {
    id: 'm3',
    sender: 'Amanda Foster',
    senderRole: 'Lead Designer',
    senderInitials: 'AF',
    content: 'The dining table for the Chen project will be delivered tomorrow. Please coordinate with the client for access.',
    timestamp: '2024-12-28T09:15:00',
    isRead: true,
    project: 'Chen Living Room'
  },
  {
    id: 'm4',
    sender: 'Office Admin',
    senderRole: 'System',
    senderInitials: 'OA',
    content: 'Reminder: Please submit your timesheet for the week by Friday EOD.',
    timestamp: '2024-12-27T08:00:00',
    isRead: true
  }
];

function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  } else if (diffDays === 1) {
    return 'Yesterday';
  } else if (diffDays < 7) {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  } else {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
}

export default function MessagesPage() {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [replyText, setReplyText] = useState('');

  const unreadCount = messages.filter(m => !m.isRead).length;

  const handleSelectMessage = (message: Message) => {
    setSelectedMessage(message);
    setMessages(prev =>
      prev.map(m =>
        m.id === message.id ? { ...m, isRead: true } : m
      )
    );
  };

  const handleSendReply = () => {
    if (!replyText.trim() || !selectedMessage) return;
    // Here you would send the reply to the API
    console.log('Sending reply:', replyText);
    setReplyText('');
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Messages</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          {unreadCount > 0 ? `You have ${unreadCount} unread message${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
        </p>
      </div>

      {/* Messages Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-280px)] min-h-[500px]">
        {/* Messages List */}
        <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden dark:bg-gray-800 dark:border-gray-700">
          <div className="p-4 border-b border-gray-100 dark:border-gray-700">
            <h2 className="font-semibold text-gray-900 dark:text-white">Inbox</h2>
          </div>
          <div className="overflow-y-auto h-full">
            {messages.map((message) => (
              <button
                key={message.id}
                onClick={() => handleSelectMessage(message)}
                className={`w-full p-4 text-left border-b border-gray-100 hover:bg-gray-50 transition-colors dark:border-gray-700 dark:hover:bg-gray-700/50 ${
                  selectedMessage?.id === message.id ? 'bg-amber-50 dark:bg-amber-900/20' : ''
                } ${!message.isRead ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 ${
                    message.senderRole === 'Lead Designer'
                      ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400'
                      : message.senderRole === 'Client'
                        ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                  }`}>
                    {message.senderInitials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`font-medium truncate ${!message.isRead ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                        {message.sender}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                        {formatTimestamp(message.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">{message.content}</p>
                    {message.project && (
                      <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-amber-100 text-amber-700 rounded dark:bg-amber-900/30 dark:text-amber-400">
                        {message.project}
                      </span>
                    )}
                  </div>
                  {!message.isRead && (
                    <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0 mt-2"></div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col dark:bg-gray-800 dark:border-gray-700">
          {selectedMessage ? (
            <>
              <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-medium ${
                    selectedMessage.senderRole === 'Lead Designer'
                      ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400'
                      : selectedMessage.senderRole === 'Client'
                        ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                  }`}>
                    {selectedMessage.senderInitials}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{selectedMessage.sender}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{selectedMessage.senderRole}</p>
                  </div>
                  <span className="ml-auto text-sm text-gray-500 dark:text-gray-400">
                    {new Date(selectedMessage.timestamp).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
                {selectedMessage.project && (
                  <div className="mt-3">
                    <span className="px-3 py-1 text-sm bg-amber-100 text-amber-700 rounded-full dark:bg-amber-900/30 dark:text-amber-400">
                      {selectedMessage.project}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex-1 p-6 overflow-y-auto">
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{selectedMessage.content}</p>
              </div>
              <div className="p-4 border-t border-gray-100 dark:border-gray-700">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type your reply..."
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                    onKeyDown={(e) => e.key === 'Enter' && handleSendReply()}
                  />
                  <button
                    onClick={handleSendReply}
                    disabled={!replyText.trim()}
                    className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500 dark:text-gray-400">
              <div className="text-center">
                <svg className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <p className="text-lg font-medium">Select a message</p>
                <p className="text-sm">Choose a conversation from the list to view</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
