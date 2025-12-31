'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

interface Message {
  id: string;
  sender: 'designer' | 'client';
  name: string;
  content: string;
  timestamp: string;
  attachments?: { name: string; type: string }[];
}

export default function MessagesPage() {
  const [newMessage, setNewMessage] = useState('');

  const messages: Message[] = [
    {
      id: '1',
      sender: 'designer',
      name: 'Amanda Foster',
      content: 'Hi John! I wanted to share the updated lighting selections for your kitchen. I\'ve found some beautiful pendant lights that would complement the modern aesthetic we\'re going for.',
      timestamp: '2024-02-08 10:30 AM',
      attachments: [
        { name: 'Lighting_Options.pdf', type: 'pdf' },
        { name: 'Pendant_Light_Photo.jpg', type: 'image' },
      ],
    },
    {
      id: '2',
      sender: 'client',
      name: 'John Davidson',
      content: 'These look amazing! I really like the second option with the brass finish. Do they come in different sizes?',
      timestamp: '2024-02-08 11:15 AM',
    },
    {
      id: '3',
      sender: 'designer',
      name: 'Amanda Foster',
      content: 'Yes! The pendant comes in 12", 16", and 20" diameters. For your island, I\'d recommend the 16" size - it provides great light coverage without overwhelming the space. I\'ve attached the spec sheet for your reference.',
      timestamp: '2024-02-08 11:45 AM',
      attachments: [
        { name: 'Pendant_Specifications.pdf', type: 'pdf' },
      ],
    },
    {
      id: '4',
      sender: 'client',
      name: 'John Davidson',
      content: 'Perfect, let\'s go with the 16" in brass. What\'s the lead time on these?',
      timestamp: '2024-02-08 2:00 PM',
    },
    {
      id: '5',
      sender: 'designer',
      name: 'Amanda Foster',
      content: 'Great choice! The lead time is typically 3-4 weeks. I\'ll add them to the selection board for your approval. Also, the countertop samples will be arriving at your home tomorrow between 10am-2pm.',
      timestamp: '2024-02-08 2:30 PM',
    },
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, this would send the message
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3 }}
      className="h-[calc(100vh-200px)] flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Messages</h1>
          <p className="text-gray-500">Chat with your designer</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50 rounded-lg dark:bg-emerald-900/20">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-emerald-700 dark:text-emerald-400">Amanda is online</span>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 bg-white rounded-xl border border-gray-200 dark:bg-gray-800 dark:border-gray-700 flex flex-col overflow-hidden">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-medium">
            AF
          </div>
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">Amanda Foster</p>
            <p className="text-sm text-gray-500">Project Designer • Modern Kitchen Renovation</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'client' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[70%] ${message.sender === 'client' ? 'order-2' : ''}`}>
                {message.sender === 'designer' && (
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-sm font-medium">
                      AF
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{message.name}</span>
                    <span className="text-xs text-gray-400">{message.timestamp}</span>
                  </div>
                )}
                <div
                  className={`p-4 rounded-2xl ${
                    message.sender === 'client'
                      ? 'bg-emerald-500 text-white rounded-br-md'
                      : 'bg-gray-100 text-gray-900 rounded-bl-md dark:bg-gray-700 dark:text-white'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  {message.attachments && (
                    <div className="mt-3 space-y-2">
                      {message.attachments.map((attachment, index) => (
                        <div
                          key={index}
                          className={`flex items-center gap-2 p-2 rounded-lg ${
                            message.sender === 'client'
                              ? 'bg-emerald-600'
                              : 'bg-white dark:bg-gray-600'
                          }`}
                        >
                          <svg className={`w-5 h-5 ${message.sender === 'client' ? 'text-white' : 'text-gray-500 dark:text-gray-300'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {attachment.type === 'pdf' ? (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            ) : (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            )}
                          </svg>
                          <span className={`text-sm ${message.sender === 'client' ? 'text-white' : 'text-gray-700 dark:text-gray-200'}`}>
                            {attachment.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {message.sender === 'client' && (
                  <p className="text-xs text-gray-400 text-right mt-1">{message.timestamp}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-end gap-3">
            <button className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
            </button>
            <div className="flex-1">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                rows={1}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
            </div>
            <button
              onClick={handleSendMessage}
              className="p-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
