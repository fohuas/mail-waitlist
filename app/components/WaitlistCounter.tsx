'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function WaitlistCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCount = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/waitlist/count');
      const data = await response.json();
      
      console.log('Waitlist count API response:', data);
      
      if (!response.ok) {
        throw new Error(data.message || '获取计数失败');
      }
      
      // 确保我们获取到了正确的计数值
      if (data.success && typeof data.count === 'number') {
        setCount(data.count);
      } else {
        console.error('Invalid count data:', data);
        setError('无法获取等待列表计数');
      }
    } catch (error) {
      console.error('Error fetching waitlist count:', error);
      setError('无法获取等待列表计数');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCount();
    
    // 每30秒刷新一次计数
    const intervalId = setInterval(fetchCount, 30000);
    
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col items-center space-y-2">
      {isLoading ? (
        <div className="flex items-center justify-center h-8">
          <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : error || count === null ? (
        <button 
          onClick={fetchCount}
          className="text-sm text-gray-500 hover:text-purple-500 transition-colors"
        >
          刷新计数
        </button>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-gray-600 dark:text-gray-400 flex items-center"
        >
          已有 <span className="font-bold text-purple-600 dark:text-purple-400 mx-1">{count}</span> 人加入等待列表
          <button 
            onClick={fetchCount}
            className="ml-2 text-gray-400 hover:text-purple-500 transition-colors"
            title="刷新计数"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </motion.div>
      )}
    </div>
  );
} 