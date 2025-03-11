'use client';

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';

export default function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('请输入邮箱地址');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || '提交失败，请稍后再试');
      }
      
      setIsSuccess(true);
      setEmail('');
      toast.success('成功加入等待列表！');
    } catch (error) {
      console.error('提交表单时出错:', error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('提交失败，请稍后再试');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <Toaster position="top-center" />
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <motion.input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="输入你的邮箱地址"
            className="w-full px-4 py-3 rounded-lg bg-black/5 dark:bg-white/10 border border-transparent focus:border-purple-500 focus:ring-2 focus:ring-purple-300 dark:focus:ring-purple-800 outline-none transition-all"
            whileFocus={{ scale: 1.01 }}
            required
            disabled={isSubmitting}
          />
          
          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="absolute right-1 top-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-md font-medium shadow-lg hover:shadow-purple-500/20 transition-all disabled:opacity-70"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            {isSubmitting ? '提交中...' : '加入等待列表'}
          </motion.button>
        </div>
      </form>
      
      {isSuccess && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-sm text-green-600 dark:text-green-400"
        >
          感谢您的加入！我们会在第一时间通知您最新消息。
        </motion.div>
      )}
    </div>
  );
} 