import { NextResponse } from 'next/server';
import { getWaitlistCount, createWaitlistTable } from '@/lib/db';

export async function GET() {
  try {
    // 确保表存在
    await createWaitlistTable();
    
    const result = await getWaitlistCount();
    console.log('API count result:', result);
    
    if (!result.success) {
      return NextResponse.json(
        { success: false, message: '获取计数失败' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { success: true, count: result.count },
      { status: 200 }
    );
  } catch (error) {
    console.error('Waitlist count API error:', error);
    return NextResponse.json(
      { success: false, message: '服务器错误，请稍后再试' },
      { status: 500 }
    );
  }
} 