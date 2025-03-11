import { NextRequest, NextResponse } from 'next/server';
import { addToWaitlist, createWaitlistTable } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    // 确保表存在
    await createWaitlistTable();
    
    const { email } = await request.json();
    
    if (!email) {
      return NextResponse.json(
        { success: false, message: '邮箱地址不能为空' },
        { status: 400 }
      );
    }
    
    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: '邮箱格式不正确' },
        { status: 400 }
      );
    }
    
    const result = await addToWaitlist(email);
    
    if (!result.success) {
      if (result.error === 'Email already exists in waitlist') {
        return NextResponse.json(
          { success: false, message: '该邮箱已经在等待列表中' },
          { status: 409 }
        );
      }
      
      return NextResponse.json(
        { success: false, message: '添加失败，请稍后再试' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { success: true, message: '成功加入等待列表！' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Waitlist API error:', error);
    return NextResponse.json(
      { success: false, message: '服务器错误，请稍后再试' },
      { status: 500 }
    );
  }
} 