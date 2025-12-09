'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Info, ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';
import Navbar from '../components/Navbar';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content:
          "Hello! I'm UniD3 chatbot. I can help you with questions about drug-disease relationships, drug effectiveness, and drug-target analysis based on our knowledge graph built from over 150,000 PubMed publications. How can I assist you today?",
        timestamp: new Date(),
      },
    ]);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      const recentMessages = messages.slice(-6);
      const conversationHistory = recentMessages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      // Direct call to Django backend
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:8000';
      const response = await fetch(`${backendUrl}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: currentInput,
          history: conversationHistory,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Backend API error: ${response.statusText}`);
      }

      const data = await response.json();
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.answer || "Sorry, I couldn't process your request.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: error instanceof Error 
          ? `Sorry, there was an error: ${error.message}` 
          : 'Sorry, there was an error processing your request. Please try again.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Navbar />

      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            UniD<sup>3</sup> Chatbot
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            LLM-driven Drug-Disease Dataset Construction via KG-RAG
          </p>
        </div>
      </header>

      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <button
            onClick={() => setShowIntro(!showIntro)}
            className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors w-full mb-2"
          >
            <Info className="w-4 h-4" />
            <span>About UniD³</span>
            {showIntro ? <ChevronUp className="w-4 h-4 ml-auto" /> : <ChevronDown className="w-4 h-4 ml-auto" />}
          </button>
          {showIntro && (
            <div className="mt-4 pb-4">
              <div className="flex flex-col lg:flex-row gap-6 items-start">
                <div className="w-full lg:w-1/2 flex-shrink-0">
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 border border-gray-200 dark:border-gray-700 shadow-sm">
                    <div className="relative w-full overflow-hidden rounded">
                      <Image
                        src="/unid3.png"
                        alt="UniD³ Framework Architecture - Workflow diagram showing research classification, entity extraction, knowledge graph generation, dataset generation, and evaluation"
                        width={800}
                        height={600}
                        className="w-full h-auto"
                        priority
                        style={{ maxHeight: '500px', objectFit: 'contain' }}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-1/2 flex-1 space-y-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                  <p>
                    <strong className="text-gray-900 dark:text-white">UniD³</strong> is a unified generative framework based on Knowledge Graph Retrieval-Augmented Generation (KG-RAG) for automated drug-disease dataset construction. With the rapid advancement of large language models (LLMs) in biomedicine, constructing high-quality and scalable drug-disease datasets (D³) remains a significant challenge due to high annotation costs and limited availability of structured data.
                  </p>
                  <p>
                    UniD³ supports three core biomedical tasks: <strong className="text-gray-900 dark:text-white">Drug-Disease Matching (DDM)</strong>, <strong className="text-gray-900 dark:text-white">Drug Effectiveness Assessment (DEA)</strong>, and <strong className="text-gray-900 dark:text-white">Drug-Target Analysis (DTA)</strong>.
                  </p>
                  <p>
                    Leveraging over <strong className="text-gray-900 dark:text-white">150,000 drug-related publications</strong> from PubMed, UniD³ employs Llama3.3-70B with carefully designed prompts to extract relational triplets. The framework introduces a <strong className="text-gray-900 dark:text-white">dual-stage entity extraction strategy</strong> that progressively builds both paper-level and KG-level entity information, enhancing precision and reducing noisy nodes in the knowledge graph.
                  </p>
                  <p>
                    The UniD³-generated datasets achieved <strong className="text-gray-900 dark:text-white">F1 scores exceeding 0.80</strong> across all three tasks and a high expert validation score of <strong className="text-gray-900 dark:text-white">0.9005 F1</strong> in the DDM task. The generated knowledge graphs and vector database are stored in{' '}
                    <a href="https://zenodo.org/records/15368180" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                      zenodo
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[80%] rounded-lg px-4 py-3 ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-md'
                }`}
              >
                <div className="whitespace-pre-wrap break-words">{message.content}</div>
                {isMounted && (
                  <div
                    className={`text-xs mt-2 ${message.role === 'user' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'}`}
                  >
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white dark:bg-gray-800 rounded-lg px-4 py-3 shadow-md">
                <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask a question about drug-disease relationships, drug effectiveness, or drug-target analysis..."
              className="flex-1 resize-none rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={2}
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            </button>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">Press Enter to send, Shift+Enter for new line</p>
        </div>
      </div>
    </div>
  );
}


