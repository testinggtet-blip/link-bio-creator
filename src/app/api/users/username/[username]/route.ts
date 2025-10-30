import { NextRequest, NextResponse } from 'next/server';
import { getUserByUsername } from '@/lib/mockData';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;
  const user = getUserByUsername(username);
  
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
  
  return NextResponse.json(user);
}
